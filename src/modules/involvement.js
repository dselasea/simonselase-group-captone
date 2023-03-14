const likesData = 
  {
    "item_id": "1"
  }

const commentsData = 
  {
    "item_id": "1",
    "username": "Khemikal",
    "comment": "I wrote this comment"
  }

const likesData2 = 
  {
    "item_id": 1
  }

const postLikes = async (likes) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likes)
  })

  const data = await response.json();
  console.log(data);
  return data;
}

const getLikes = async () => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/likes`, 
  {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const postComment = async (comment) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/comments`, 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  const data = await response.json();
  console.log(data);
  return data;
}

const getComment = async (item_id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/comments?item_id=${item_id}`, 
  {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json();
  console.log(data);
  return data;
}

postLikes(likesData);
getLikes();



