import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';

export class CartUtil{
    public static get(): Cart{
        //pega os dados do localSTORAGE
        const data = localStorage.getItem('petshopcart');

        //se n tiver, retona um noco carrinho
        if(!data)
            return new Cart();

            //se tiver dados retorna o carrinho
            return JSON.parse(data);
    }

    public static add(id: string, product: string, quantity: number, price: number, image: string){
        //busca o carrinho
        let cart = this.get();

        //gera o novo item
        const item = new CartItem(id, product, quantity, price, image);

        //add ao carrinho
        cart.items.push(item);

        //salva
        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static update(cart: Cart){
        //salva no localStorage
        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static clear(){
        localStorage.removeItem('petshopcart');
    }
}