# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-center gap-5 p-5'>
            <NavLink to={`/wish-list/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.wishList?.length || 0)} Wish list Items
            </NavLink>
            <NavLink to={`/cart/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.cartList?.length || 0)} Cart Items
            </NavLink>
            <NavLink to={`/my-orders/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.orders?.length || 0)} Orders
            </NavLink>
            <NavLink className="p-5 bg-red-50">
              Profit of {user.profit || "0"} rupees
            </NavLink>
            <NavLink to={`/my-products/${params.role}/${params.authId}`} className="p-5 bg-red-50">
              {(user.orders?.length || 0)} Orders
            </NavLink>
          </div>