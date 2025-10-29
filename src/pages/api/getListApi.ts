const productData = '/fake_data/product.json'; 

export async function getProduct() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(productData);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch product data: Unknown error');
  }
}
