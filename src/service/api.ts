import request from '.';

export async function getCruises() {
  return request.get('/mock/cruise');
}

export async function getHistory() {
  return request.get('/mock/history');
}

export async function getUser() {
  return request.get('/mock/user');
}
