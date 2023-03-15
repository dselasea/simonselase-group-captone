const likesData = {
  item_id: 1,
};

const comment = {
  item_id: 1,
  username: 'Khemikal',
  comment: 'Hi from me again',
};

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr';

export const postLikes = async (likes) => {
  const response = await fetch(`${baseUrl}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likes),
  });

  const data = await response.text();
  return data;
};

export const getLikes = async () => {
  const response = await fetch(`${baseUrl}/likes`);
  const data = await response.json();
  return data;
};

export const postComment = async (comment) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/comments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
  const data = await response.text();
  return data;
};

const getComment = async (itemId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u2hplAfN6gX3LdTPlmsr/comments?item_id=${itemId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

  const data = await response.json();
  return data;
};

postLikes(likesData);
getLikes();
postComment(comment);
getComment(1);
