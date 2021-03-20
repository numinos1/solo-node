/**
 * Sort SWAPI People Results
 *
 * @param      {Array}    people          The list of people
 * @param      {Array}    sortBy          Sort people by name, height or mass
 */
module.exports = function sortPeople(people, sortBy) {
  switch (sortBy) {
    case 'name':
      return people.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case 'height':
      return people.sort((a, b) =>
        (parseInt(a.height, 10) || 0) -
        (parseInt(b.height, 10) || 0)
      );

    case 'mass':
      return people.sort((a, b) =>
        (parseInt(a.mass, 10) || 0) -
        (parseInt(b.mass, 10) || 0)
      );

    default:
      return people;
  }
}
