"use server";

import { certifications } from "@/data/certifications";
import connectMongo from "@/lib/db";
import CertificationModel from "@/models/Certification";
import { Certification } from "@/types/Certification";
import { Comparator } from "@/types/Comparator";

const comparator = (a: Certification, b: Certification): Comparator => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  const diff = dateA.getTime() - dateB.getTime();

  switch (true) {
    case diff < 0:
      return -1;

    case diff > 0:
      return 1;

    default:
      return 0;
  }
};

export async function getLastCertifications(
  last = 6
): Promise<Certification[]> {
  const sorted = certifications.sort(comparator).reverse().slice(0, last);

  return new Promise(res => res(sorted));
}

export async function getCertifications(search = ""): Promise<Certification[]> {
  const filtered = certifications
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    .sort(comparator);

  return new Promise(res => res(filtered.reverse()));
}

export async function getCertificationsTest() {
  await connectMongo();

  const certs = await CertificationModel.find();

  return certs;
}
