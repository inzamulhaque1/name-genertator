import { countries, type Country } from "@/data/countries";
import { emailDomains } from "@/data/domains";
import { companyPrefixes, companySuffixes } from "@/data/companies";

export interface GeneratedIdentity {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  age: number;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  countryCode: string;
  ssn: string;
  ssnLabel: string;
  creditCard: string;
  creditCardExp: string;
  creditCardCvv: string;
  username: string;
  password: string;
  company: string;
}

function rand(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone(format: string): string {
  return format.replace(/N/g, () => String(randInt(0, 9)));
}

function generateSSN(format: string): string {
  return format.replace(/N/g, () => String(randInt(0, 9))).replace(/A/g, () =>
    String.fromCharCode(65 + randInt(0, 25))
  );
}

function generateLuhnCard(): string {
  const prefixes = ["4532", "4556", "4916", "5425", "5515", "5353"];
  const prefix = rand(prefixes);
  const digits = prefix.split("").map(Number);

  while (digits.length < 15) {
    digits.push(randInt(0, 9));
  }

  // Luhn checksum
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[digits.length - 1 - i];
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  const check = (10 - (sum % 10)) % 10;
  digits.push(check);

  return digits.join("").replace(/(.{4})/g, "$1 ").trim();
}

function generatePassword(): string {
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const nums = "23456789";
  const special = "!@#$%&*?";
  const all = lower + upper + nums + special;

  let password = "";
  password += lower[randInt(0, lower.length - 1)];
  password += upper[randInt(0, upper.length - 1)];
  password += nums[randInt(0, nums.length - 1)];
  password += special[randInt(0, special.length - 1)];
  for (let i = 4; i < 12; i++) {
    password += all[randInt(0, all.length - 1)];
  }
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function generateUsername(first: string, last: string, birthYear: number): string {
  const styles = [
    `${first.toLowerCase()}.${last.toLowerCase()}`,
    `${first.toLowerCase()}_${last.toLowerCase()}`,
    `${first.toLowerCase()}${last.toLowerCase()}${birthYear % 100}`,
    `${first[0].toLowerCase()}${last.toLowerCase()}${randInt(1, 999)}`,
    `${first.toLowerCase()}${randInt(10, 99)}`,
    `${last.toLowerCase()}.${first.toLowerCase()}`,
  ];
  return rand(styles);
}

async function loadCountryData(countryCode: string) {
  const nameModules: Record<string, () => Promise<{ names: { male: string[]; female: string[]; last: string[] } }>> = {
    us: () => import("@/data/names/us"),
    uk: () => import("@/data/names/uk"),
    ca: () => import("@/data/names/ca"),
    de: () => import("@/data/names/de"),
    fr: () => import("@/data/names/fr"),
    es: () => import("@/data/names/es"),
    br: () => import("@/data/names/br"),
    in: () => import("@/data/names/in"),
    jp: () => import("@/data/names/jp"),
    au: () => import("@/data/names/au"),
  };

  const addressModules: Record<string, () => Promise<{ addresses: { cities: { name: string; state: string; zip: string; streets: string[] }[] } }>> = {
    us: () => import("@/data/addresses/us"),
    uk: () => import("@/data/addresses/uk"),
    ca: () => import("@/data/addresses/ca"),
    de: () => import("@/data/addresses/de"),
    fr: () => import("@/data/addresses/fr"),
    es: () => import("@/data/addresses/es"),
    br: () => import("@/data/addresses/br"),
    in: () => import("@/data/addresses/in"),
    jp: () => import("@/data/addresses/jp"),
    au: () => import("@/data/addresses/au"),
  };

  const code = nameModules[countryCode] ? countryCode : "us";
  const [nameData, addressData] = await Promise.all([
    nameModules[code](),
    addressModules[code](),
  ]);

  return { names: nameData.names, addresses: addressData.addresses };
}

export async function generateIdentity(
  countryCode: string = "us",
  genderPref?: "male" | "female"
): Promise<GeneratedIdentity> {
  const country = countries.find((c) => c.code === countryCode) || countries[0];
  const { names, addresses } = await loadCountryData(countryCode);

  const gender = genderPref || (Math.random() > 0.5 ? "male" : "female");
  const firstName = rand(gender === "male" ? names.male : names.female);
  const middleName = rand(gender === "male" ? names.male : names.female);
  const lastName = rand(names.last);

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - randInt(18, 65);
  const birthMonth = randInt(1, 12);
  const birthDay = randInt(1, 28);
  const dob = new Date(birthYear, birthMonth - 1, birthDay);
  const age = currentYear - birthYear;

  const city = addresses.cities[randInt(0, addresses.cities.length - 1)];
  const houseNum = randInt(1, 9999);
  const street = `${houseNum} ${rand(city.streets)}`;

  const emailFirst = firstName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const emailLast = lastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const emailStyles = [
    `${emailFirst}.${emailLast}`,
    `${emailFirst}${emailLast}`,
    `${emailFirst}.${emailLast}${birthYear % 100}`,
    `${emailFirst[0]}${emailLast}`,
  ];
  const email = `${rand(emailStyles)}@${rand(emailDomains)}`;

  const expMonth = String(randInt(1, 12)).padStart(2, "0");
  const expYear = String(currentYear + randInt(1, 5)).slice(-2);

  return {
    firstName,
    middleName,
    lastName,
    fullName: `${firstName} ${middleName} ${lastName}`,
    gender: gender === "male" ? "Male" : "Female",
    dateOfBirth: dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    age,
    email,
    phone: `${country.phonePrefix} ${generatePhone(country.phoneFormat)}`,
    street,
    city: city.name,
    state: city.state,
    zip: city.zip,
    country: country.name,
    countryCode: country.code,
    ssn: generateSSN(country.ssnFormat),
    ssnLabel: country.ssnLabel,
    creditCard: generateLuhnCard(),
    creditCardExp: `${expMonth}/${expYear}`,
    creditCardCvv: String(randInt(100, 999)),
    username: generateUsername(firstName, lastName, birthYear),
    password: generatePassword(),
    company: `${rand(companyPrefixes)} ${rand(companySuffixes)}`,
  };
}
