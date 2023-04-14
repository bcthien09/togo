const emptyOrResult = (data) => {
    return data ?? [];
}

const getOffset = (currentPage = 1, itemsPage) => {
  return (currentPage - 1) * [itemsPage];
}

const random = () => {
  const randomString =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
		const charactersLength = randomString.length;
		for (let i = 0; i < 10; i++) {
			result += randomString.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}

		return result;
}
  
module.exports = {
  emptyOrResult,
  getOffset,
  random
}
