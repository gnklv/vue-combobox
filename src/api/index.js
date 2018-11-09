import _cities from "@/data";

function getCities() {
  let cities = _cities.map(item => item["City"]),
    options = {
      perPage: 10,
      currentPage: 5
    };

  if (typeof options.perPage === "number") {
    const from = options.currentPage * options.perPage;
    cities = cities.splice(from, options.perPage);
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cities);
    }, 500);
  });
}

export default {
  getCities
};
