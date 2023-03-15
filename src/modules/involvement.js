export const postLikes = async (likes) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UFZo6TtTAGjI2DTYvdQ7/likes', {
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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UFZo6TtTAGjI2DTYvdQ7/likes',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  const data = await response.json();
  return data;
};

export const postComment = async (comment) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UFZo6TtTAGjI2DTYvdQ7/comments',
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

export const getComment = async (itemId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UFZo6TtTAGjI2DTYvdQ7/comments?item_id=${itemId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

  const data = await response.json();
  return data;
};
