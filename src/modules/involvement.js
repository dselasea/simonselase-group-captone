const likesData = 
  {
    "item_id": "1"
  }

const likesData2 = 
  {
    "item_id": 1
  }
const postLikes = async (likes) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/likes`, 
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(likes)
  });
  const data = await response.json();
  return data;
}

const getLikes = async () => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/likes`, 
  {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}

postLikes(likesData);
postLikes(likesData2);
getLikes();

