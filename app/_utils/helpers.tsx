import unorm from "unorm";

export const titleToSlug = (title: string) =>
    unorm.nfd(title)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') 
      .trim();


export async function getS3UploadUrl(contentType: string, contentLength: number, id: string) {
  try {
    const url = await fetch('https://api.platelette.com/s3', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({contentLength, contentType, id})
    }).then(res => {
      if (!res.ok) {
        console.error(res.status)
      }
      return res.json()
    }).then(res => res.url)
    console.log('success', url)
    return url;
  } catch (error) {
    console.error(error);
    return '';
  }
}