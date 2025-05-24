import { a9 as defineStore, aj as Notify } from "./index-DTRxxbQ7.js";
import { a as axios } from "./index-BSBq6A-N.js";
const API_URL = "http://localhost:3001/api/products";
const useProductStore = defineStore("productStore", {
  state: () => ({
    products: []
  }),
  actions: {
    async loadProducts() {
      try {
        const { data } = await axios.get(API_URL);
        this.products = data;
      } catch {
        Notify.create({ type: "negative", message: "Erro ao carregar produtos." });
      }
    },
    async addProduct(product) {
      try {
        await axios.post(API_URL, product);
        await this.loadProducts();
        Notify.create({ type: "positive", message: `Produto "${product.name}" adicionado!` });
      } catch {
        Notify.create({ type: "negative", message: "Erro ao adicionar produto." });
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`${API_URL}/${productId}`);
        await this.loadProducts();
        Notify.create({ type: "positive", message: "Produto excluído com sucesso!" });
      } catch {
        Notify.create({ type: "negative", message: "Erro ao excluir produto." });
      }
    },
    async restockProduct(productId, quantity) {
      try {
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
          Notify.create({ type: "negative", message: "Produto não encontrado." });
          return;
        }
        await axios.put(`${API_URL}/${productId}`, {
          quantity: product.quantity + quantity
        });
        await this.loadProducts();
        Notify.create({ type: "positive", message: `Produto "${product.name}" reabastecido!` });
      } catch {
        Notify.create({ type: "negative", message: "Erro ao reabastecer produto." });
      }
    }
  }
});
export {
  useProductStore as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zdG9yZS1DM0lscG94VS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy9wcm9kdWN0LXN0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSAncGluaWEnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tICdxdWFzYXInXG5cbmNvbnN0IEFQSV9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9wcm9kdWN0cydcblxuZXhwb3J0IGNvbnN0IHVzZVByb2R1Y3RTdG9yZSA9IGRlZmluZVN0b3JlKCdwcm9kdWN0U3RvcmUnLCB7XG4gIHN0YXRlOiAoKSA9PiAoe1xuICAgIHByb2R1Y3RzOiBbXSxcbiAgfSksXG5cbiAgYWN0aW9uczoge1xuICAgIGFzeW5jIGxvYWRQcm9kdWN0cygpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KEFQSV9VUkwpXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBkYXRhXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7IHR5cGU6ICduZWdhdGl2ZScsIG1lc3NhZ2U6ICdFcnJvIGFvIGNhcnJlZ2FyIHByb2R1dG9zLicgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGFkZFByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdChBUElfVVJMLCBwcm9kdWN0KVxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRQcm9kdWN0cygpXG4gICAgICAgIE5vdGlmeS5jcmVhdGUoeyB0eXBlOiAncG9zaXRpdmUnLCBtZXNzYWdlOiBgUHJvZHV0byBcIiR7cHJvZHVjdC5uYW1lfVwiIGFkaWNpb25hZG8hYCB9KVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoeyB0eXBlOiAnbmVnYXRpdmUnLCBtZXNzYWdlOiAnRXJybyBhbyBhZGljaW9uYXIgcHJvZHV0by4nIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBkZWxldGVQcm9kdWN0KHByb2R1Y3RJZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKGAke0FQSV9VUkx9LyR7cHJvZHVjdElkfWApXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFByb2R1Y3RzKClcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7IHR5cGU6ICdwb3NpdGl2ZScsIG1lc3NhZ2U6ICdQcm9kdXRvIGV4Y2x1w61kbyBjb20gc3VjZXNzbyEnIH0pXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7IHR5cGU6ICduZWdhdGl2ZScsIG1lc3NhZ2U6ICdFcnJvIGFvIGV4Y2x1aXIgcHJvZHV0by4nIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyByZXN0b2NrUHJvZHVjdChwcm9kdWN0SWQsIHF1YW50aXR5KSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5wcm9kdWN0cy5maW5kKChwKSA9PiBwLmlkID09PSBwcm9kdWN0SWQpXG4gICAgICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgICAgIE5vdGlmeS5jcmVhdGUoeyB0eXBlOiAnbmVnYXRpdmUnLCBtZXNzYWdlOiAnUHJvZHV0byBuw6NvIGVuY29udHJhZG8uJyB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dChgJHtBUElfVVJMfS8ke3Byb2R1Y3RJZH1gLCB7XG4gICAgICAgICAgcXVhbnRpdHk6IHByb2R1Y3QucXVhbnRpdHkgKyBxdWFudGl0eSxcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkUHJvZHVjdHMoKVxuICAgICAgICBOb3RpZnkuY3JlYXRlKHsgdHlwZTogJ3Bvc2l0aXZlJywgbWVzc2FnZTogYFByb2R1dG8gXCIke3Byb2R1Y3QubmFtZX1cIiByZWFiYXN0ZWNpZG8hYCB9KVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoeyB0eXBlOiAnbmVnYXRpdmUnLCBtZXNzYWdlOiAnRXJybyBhbyByZWFiYXN0ZWNlciBwcm9kdXRvLicgfSlcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sVUFBVTtBQUVKLE1BQUMsa0JBQWtCLFlBQVksZ0JBQWdCO0FBQUEsRUFDekQsT0FBTyxPQUFPO0FBQUEsSUFDWixVQUFVLENBQUU7QUFBQSxFQUNoQjtBQUFBLEVBRUUsU0FBUztBQUFBLElBQ1AsTUFBTSxlQUFlO0FBQ25CLFVBQUk7QUFDRixjQUFNLEVBQUUsS0FBTSxJQUFHLE1BQU0sTUFBTSxJQUFJLE9BQU87QUFDeEMsYUFBSyxXQUFXO0FBQUEsTUFDeEIsUUFBYztBQUNOLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLDZCQUE4QixDQUFBO0FBQUEsTUFDakY7QUFBQSxJQUNLO0FBQUEsSUFDRCxNQUFNLFdBQVcsU0FBUztBQUN4QixVQUFJO0FBQ0YsY0FBTSxNQUFNLEtBQUssU0FBUyxPQUFPO0FBQ2pDLGNBQU0sS0FBSyxhQUFZO0FBQ3ZCLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLFlBQVksUUFBUSxJQUFJLGdCQUFpQixDQUFBO0FBQUEsTUFDNUYsUUFBYztBQUNOLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLDZCQUE4QixDQUFBO0FBQUEsTUFDakY7QUFBQSxJQUNLO0FBQUEsSUFDRCxNQUFNLGNBQWMsV0FBVztBQUM3QixVQUFJO0FBQ0YsY0FBTSxNQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksU0FBUyxFQUFFO0FBQzVDLGNBQU0sS0FBSyxhQUFZO0FBQ3ZCLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLGdDQUFpQyxDQUFBO0FBQUEsTUFDcEYsUUFBYztBQUNOLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLDJCQUE0QixDQUFBO0FBQUEsTUFDL0U7QUFBQSxJQUNLO0FBQUEsSUFDRCxNQUFNLGVBQWUsV0FBVyxVQUFVO0FBQ3hDLFVBQUk7QUFDRixjQUFNLFVBQVUsS0FBSyxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxTQUFTO0FBQzVELFlBQUksQ0FBQyxTQUFTO0FBQ1osaUJBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLDBCQUEyQixDQUFBO0FBQ3RFO0FBQUEsUUFDVjtBQUNRLGNBQU0sTUFBTSxJQUFJLEdBQUcsT0FBTyxJQUFJLFNBQVMsSUFBSTtBQUFBLFVBQ3pDLFVBQVUsUUFBUSxXQUFXO0FBQUEsUUFDOUIsQ0FBQTtBQUNELGNBQU0sS0FBSyxhQUFZO0FBQ3ZCLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLFlBQVksUUFBUSxJQUFJLGtCQUFtQixDQUFBO0FBQUEsTUFDOUYsUUFBYztBQUNOLGVBQU8sT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLCtCQUFnQyxDQUFBO0FBQUEsTUFDbkY7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUNILENBQUM7In0=
