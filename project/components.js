import Vue from './node_modules/vue/dist/vue.js';
// import { Tabbar, TabItem } from 'mint-ui';

// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);


//引入tabber标签
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//引入导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//引入icon图标
import { Icon } from 'vant';
Vue.use(Icon);

// 引入加载模块
import { Loading } from 'vant';
Vue.use(Loading);

//滑块
import { Slider } from 'vant';
Vue.use(Slider);

//按钮
import { Button } from 'vant';
Vue.use(Button);

import {CountDown} from "vant"

Vue.use(CountDown);

import { Divider } from 'vant';

Vue.use(Divider);

//弹出层
import { Popup } from 'vant';

Vue.use(Popup);

//switch开关
import { Switch } from 'vant';

Vue.use(Switch);

import { Field } from 'vant';

Vue.use(Field)

import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);

import { Toast } from 'vant';

Vue.use(Toast);
