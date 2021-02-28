/**
 * 存储的是 角色对应的权限名称
 */

const routeToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'category',
    },
  ],
};
/**
 * 过滤掉没有权限的路由
 * @param {string} role
 * @param {arr} routes
 */
export default function getMenuRoute(role, routes) {
  const allowRoutesName = routeToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const obj = r;
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
