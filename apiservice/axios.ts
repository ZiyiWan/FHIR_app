import axios from "axios";

const baseUrl = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir";

export async function getPatientList(currentPage: number) {
  const result: any = axios
    .get(
      `https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient?_format=json&_pretty=true&_getpagesoffset=${currentPage}&_count=10&_format=json&_pretty=true&_bundletype=searchset`
    )
    .then((res) => {
      console.log(res.data.entry);
      return res.data.entry;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}

export async function getPatientsByName(name: string, currentPage: number) {
  const result: any = axios
    .get(
      `https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient?given=${name}&_getpagesoffset=${currentPage}&_count=10&_format=json&_pretty=true&_bundletype=searchset`
    )
    .then((res) => {
      console.log(res.data.entry);
      return res.data.entry;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}
