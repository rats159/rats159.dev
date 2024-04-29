export async function typeout(string, delayPerChar, callback) {
  if (string == "") {
    return;
  }
  await typeout(string.substring(0, string.length - 1), delayPerChar, callback);
  callback(string);
  return new Promise(async (resolve) => {
    setTimeout(resolve, delayPerChar);
  });
}
