export default function (name, opts = {}) {
  const key = name.trim().toLowerCase().split(' ').join('_');
  return key.replace(/\W+/g, '').toUpperCase();
}
