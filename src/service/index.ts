export default function request () {
}

request.get = (url: string) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  return new Promise((resolve) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data)
      }
    }
    xhr.send();
  })
}


