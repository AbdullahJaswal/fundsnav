export default function ProcessURL(url: string, search: string = "", page: number = 1) {
  if (search) {
    url = `${url}&search=${search}`;
  }

  if (page) {
    url = `${url}&page=${page}`;
  }

  return url;
}
