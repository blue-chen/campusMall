const apis = {

    store_register: 'https://mock.apifox.cn/m1/1947261-0-default/register',
    store_login: 'https://mock.apifox.cn/m1/1947261-0-default/login',
    oss_policy: 'http://47.106.64.140:8007/oss/get_policy',
    add_goods: 'http://47.106.64.140:8007/goods/add_goods',
    find_all_goods: 'https://mock.apifox.cn/m1/1947261-0-default/findAllGoods',
    find_user_goods: 'https://mock.apifox.cn/m1/1947261-0-default/findUserGoods',
    find_goods_by_type: 'https://mock.apifox.cn/m1/1947261-0-default/findElectrictProducts',
    find_goods_by_id: 'https://mock.apifox.cn/m1/1947261-0-default/findGoodsById',
    //发布丢失物品
    report_lost: 'http://47.106.64.140:8007/lost_and_found/insert',
    find_all_lost: 'http://47.106.64.140:8007/lost_and_found/get_all',
    user_delete_goods: 'http://47.106.64.140:8007/admin/del_goods',
    // login:'/login',
    // find:'/find',
    // user_delete_goods: '/admin/del_goods',

}

export {
    apis
}
// 封装api的好处，当接口修改时，只要改源头的接口地址一次就行，其他用到接口的地方都会自动跟着修改，准确又方便。
/* 如果后端没有处理跨域，需求前端来代理，那么多个接口的ip地址和端口就是代理中target那个地址和端口，
然后封装api时，ip地址端口可以省略掉如login:'/login'。
如果后端跨域了，那么就不需要代理了，直接把那些接口的IP地址端口在封装axios时设置为baseUrl，然后封装api时，
ip地址端口可以省略掉，如这个接口省略了ip地址端口，user_delete_goods: '/admin/del_goods',

 */