const movies = [
    {
      title: "Frozen",
      rating: 4.2,
      hasWatched: true
    },
    {
      title: "Love, Actually",
      rating: 4.9,
      hasWatched: false
    },
    {
      title: "Donald Duck",
      rating: 5,
      hasWatched: true
    }
];

movies.forEach(x => console.log(`You have ${x.hasWatched ? 'watched' : 'not seen'} "${x.title}" - ${x.rating} stars`));
