// application's data inside of app/data/friends.js as an array of objects.
// ===============================================================================
// DATA
// Below data will hold all of friends.
// https://upload.wikimedia.org/wikipedia/en/8/80/Melisandre-Carice_van_Houten.jpg
// But you could have it be an empty array as well.
// ===============================================================================

var friendsArray = 
[
  { name: "Daenerys Targaryen",
    photo : "https://i.ytimg.com/vi/wEgTxhY_ges/maxresdefault.jpg",
    scores : ["5","2","5","1","3","1","4","5","1","2"]  
  },

  { name: "Arya Stark",
    photo: "http://images5.fanpop.com/image/photos/31100000/Arya-arya-stark-31146934-1280-720.png",
    scores:["2","5","1","1","5","5","4","5","4","2"]  
  },

  { name: "Sansa Stark",
    photo: "https://uproxx.files.wordpress.com/2017/08/sansa-stark.jpg",
    scores:["1","1","5","1","3","4","4","1","5","2"]  
  },

  { name: "Bran Stark",
    photo: "https://jovemnerd.com.br/wp-content/uploads/2019/04/bran-stark-760x428.png",
    scores:["1","4","3","5","5","5","4","5","5","2"]  
  },
  
  { name: "John Snow",
    photo: "https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/john-snow-1920.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg",
    scores:["4","4","1","1","5","5","4","5","1","2"]  
},

]

//  we export the array. This makes it accessible to other files using require.
module.exports = friendsArray;

