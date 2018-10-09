<template>
    <div id="app">
        <div class="search_title">
            <!--<div class="row ">-->
            <h2>搜索订单:</h2>
            <div class="search_name">
                <label style="flex:1.22"  class="">昵称搜索</label>
                <div style="flex: 5">
                    <input  type="text" style="text-indent:5px"  placeholder="昵称" v-model="keywords.username" class="search" @input="search_name">
                    <ul class='search-result' v-if="search_result.length">
                        <li :key="index" v-for="(item,index) in search_result" @click="select(item)">{{item}}</li>
                    </ul>
                </div>
                <div style="flex:2">
                    <input type="text" style="text-indent:5px"  class="search"  placeholder="商品id" v-model="keywords.goods_id" >
                </div>
                <button style="flex:1"  class="search_order_btn" @click="searchorder">搜索</button>
            </div>
            <div class="search_name1">
                <label>订单号搜索</label>
                <div style="margin: 0 20px">
                    <input type="text" style="text-indent:4px"  placeholder="订单号" v-model="keywords.order_id" class="search">
                </div>
                <button  class="search_order_btn" @click="searchorder">搜索</button>
            </div>
        </div>
        <h2>订单列表</h2>
        <table class="layui-table" >
            <thead>
                <th v-for="row in title">{{row.cn}}</th>
                <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(col,index) in lists" @click="goto_detail(col)" style="cursor:pointer">
                <td v-for="row in title">
                    <!--<template v-if="row.en=='order_goods'  && col.order_goods>0">-->
                    <!--{{lists.goods[col[row.en]].title}}-->
                    <!--</template>-->
                    <!--<template v-else-if="row.en=='color' && col.color>0">-->
                    <!--{{lists.category[col[row.en]].title}}-->
                    <!--</template>-->
                    <!--<template v-else>-->
                    {{col[row.en]}}
                    <!--</template>-->
                </td>
                <td>
                    <button class="">搜索</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "searchorder",
        data(){
            return{
            title: [
                {
                    en: "id",
                    cn: '订单号'
                },
                {
                    en: "nick_name",
                    cn: '昵称'
                },
                {
                    en: "order_goods_title",
                    cn: '商品'
                },
                {
                    en: "color_title",
                    cn: '商品ID'
                },
                {
                    en: "order_num",
                    cn: '数量'
                },

            ],
            search_result: [],
            lists: [],
            text: `h4@@h4|@ Alex@@Alex|@ heise@@黑色|@ VVCzhaoshang@@VVC招商|@ bubangbang@@布帮帮|@ hana@@哈娜|@ A_zijiayoupin@@ A?仔家优品|@ yinbaomingpin@@引爆名品|@ fennahanpin@@芬娜韩品|@ yinghuahanzhuang@@樱花韩妆|@ mantou@@馒头|@ jingjing@@晶晶|@ mujiatuandui@@沐家团队|@ weimeizi@@微美姿|@ yaner@@艳儿|@ huishenghuoshangmao@@慧生活商贸|@ xiaodan@@小丹|@ lilinghui@@李玲慧|@ zhuzhuxia@@朱朱侠|@ babaimate@@八佰玛特|@ xiaoyun@@晓云|@ abing@@阿兵|@ xiaoying@@小颖|@ xingyuxinyuan@@星语心愿|@ liuyangxiao@@刘阳晓|@ xiaoxiabaokuan@@小夏爆款|@ liuhongyan@@刘鸿雁|@ xinxin@@欣欣|@ damengmeng@@大梦梦|@ shiqingqing@@施青青|@ hengcanlipin@@恒灿礼品|@ aishini@@爱是你|@ nipeichun@@倪佩春|@ chengpinlangongzuoshi@@诚品蓝工作室|@ fengxing@@丰行|@ xunjiangweigou@@训江微购|@ huiyinglianmengyixiang@@汇英联盟一祥|@ gaoxing@@高兴|@ xianqu@@闲趣|@ xiexiaojuan@@谢晓娟|@ letao@@乐淘|@ guowenlong@@郭文龙|@ xiaopingguo@@小苹果|@ duoma@@多麻|@ pingziling@@瓶子玲|@ pangge@@胖哥|@ @@|@ laoK@@老K|@ dajunshi@@大军师|@ Nuoge_huangjinyan@@Nuoge-黄金眼|@ wuyan@@吴燕|@ Yclzg1972@@Yclzg1972|@ junjun@@君君|@ jiejie@@尐洁|@ jiangjie@@姜姐|@ VVCyizhouqiongzhen@@VVC一周琼珍|@ duoer@@朵儿|@ maji@@麻吉|@ vvcqiao@@vvc巧|@ honghongHoney@@红红Honey|@ shudaizi@@书呆子|@ tianyi@@添翼|@ hezhi@@禾知|@ Fannie@@Fannie|@ NINA@@NINA|@ vvcdongshi_Rush@@vvc懂事_Rush|@ liushihai@@刘市海|@ aixue@@爱雪|@ vvcmihua@@vvc米花|@ Feynman@@Feynman|@ ayu@@阿鱼|@ vvc_zk@@vvc?zk|@ chenzhen@@陈振|@ VVC_S@@VVC-S|@ mitao@@蜜桃|@ xiaoxiong@@小熊|@ zhoulaotou@@周老头|@ wukong@@悟空|@ yangyangmama@@阳阳妈妈|@ lina@@莉娜|@ pangxiongguoji@@胖熊国际|@ 15858955822@@15858955822|@ moyanfei@@莫妍飞|@ langboya@@狼博雅|@ spring@@spring|@ xumiaomiao@@徐苗苗|@ yirenhongzhuang@@伊人红妆|@ wuxiaotian@@吴晓甜|@ xiaoningmeizhuang@@小宁美妆|@ wangjing@@王晶|@ xiangxiang@@湘湘|@ senvlanghanguoguan@@涩女郎韩国馆|@ changbizihengheng@@长鼻子哼哼|@ tuma@@图妈|@ yanghuan@@杨欢|@ yueji@@悦己|@ aimeili@@爱美丽|@ bichuanmei@@毕传梅|@ huangdanfengH_D_F@@黄丹凤H.D.F|@ VVCdongshi@@VVC董事|@ xiaozhong@@晓忠|@ mitao@@蜜桃|@ lianbangdiaochaju@@联邦调查局|@ yuzhimeng@@羽之梦|@ shangpinxiuhuanzhuangpifa@@尚品秀换装批发|@ baoer@@宝儿|@ haoge@@浩哥|@ VVC_huahuaaimili@@VVC-花花爱米粒|@ bingomama@@bingomama|@ VVC__abing@@VVC--啊冰|@ pengyouquanshitidian@@朋友圈实体店|@ duoduo@@多多|@ youfeiyan@@尤飞燕|@ youyezhengpindian@@呦耶正品店|@ xiaolongbaoyushaqima@@小笼包与沙琪玛|@ huguomei@@胡国美|@ huqingjun@@胡青君|@ yangbeilei@@杨蓓蕾|@ cc@@cc|@ dongdong@@东东|@ xue@@雪|@ chen@@chen|@ liuli@@琉璃|@ xiari@@夏日|@ xiaoma@@小马|@ xipinquanqiugou__xibeimaoyi@@西品全球购--西贝贸易|@ laohu@@老胡|@ linjie@@林洁|@ yangzhou@@洋洲|@ tangma@@糖妈|@ Easy@@Easy|@ hanmeiren@@韩美人|@ qinger@@清儿|@ techun555@@特纯555|@ tianyuhanweixuan@@天宇韩味轩|@ qingqinghuijibaokuan@@清青汇集爆款|@ binger@@冰儿|@ vick_ruan@@vick_ruan|@ nia@@妮阿|@ liangzi@@良子|@ yalin@@雅琳|@ JIN@@JIN|@ xiaochuanchang@@小船长|@ WE_KO@@WE.KO|@ duolunduopapazou@@多伦多趴趴走|@ ziyuhanzhuang@@紫玉韩妆|@ xuexinxing@@雪心星|@ nanzi@@南子|@ luxiaoxiao@@卢小小|@ juanjuan@@娟娟|@ huangjinwen@@黄瑾雯|@ changchang@@畅畅|@ chengdan@@程丹|@ xuhui@@徐惠|@ Ada_sxiaopu@@Ada's小铺|@ biaoshu@@标叔|@ axiao@@阿啸|@ fengwopai@@蜂窝派|@ zhenmei@@真美|@ VVCdongshiLoe@@VVC董事Loe|@ yanxi@@妍喜|@ wangyang@@汪洋|@ zhengxigongmao@@正玺工贸|@ shihuijuan@@施惠娟|@ hanhan@@涵涵|@ xisongwu@@西松屋|@ sanshui@@三水|@ jiajia@@佳佳|@ asa@@阿sa|@ shuyumeng@@淑羽梦|@ nizi111@@妮子111|@ mengkeke@@梦柯柯|@ dongxu@@东旭|@ mi_le@@mi le|@ kuailemao@@快乐猫|@ VVCzhuanmai@@VVC专卖|@ aixinjueluo@@爱新觉罗|@ haixia@@haixia|@ jingjing@@静静|@ xiyangyang@@喜羊羊|@ niujin@@牛津|@ smlslulu@@smlslulu|@ long@@龙|@ hongbomama@@宏博妈妈|@ tangtang@@糖糖|@ xiaoQ@@小Q|@ sun@@sun|@ VVCshishanghufu_longxiu_@@VVC时尚护肤。龙秀。|@ NaNa@@NaNa|@ sima@@斯妈|@ ying@@瀛|@ aqi@@阿奇|@ sunguo@@孙国|@ lamachaoliufang@@辣妈潮流坊|@ xuridongsheng@@旭日东升|@ zhaofengtuandui@@兆丰团队|@ zhaohanna@@赵韩娜|@ ledushangxing@@乐都商行|@ yingtao@@樱桃|@ shadow@@shadow|@ VVCdongshi@@VVC董事|@ laoshe@@老舍|@ @@|@ VVCxiaoyang@@VVC小杨|@ jiulaoye@@舅姥爷|@ diandiandidi@@点点滴滴|@ caocao@@曹曹|@ xiaomanmingzhuang@@小曼名妆|@ lingyun112386@@lingyun112386|@ wenjie@@文杰|@ xiaogenesang@@小哥nesang|@ xiaotong@@小彤|@ baihuashu@@白桦树|@ duobaoyu@@多宝鱼|@ shenyangtengyidashangmao@@沈阳腾亿达商贸|@ gengen@@亘亘|@ zhuifengren@@追风人|@ fc@@fc|@ guanlangchengpin@@冠郎诚品|@ Alvin@@Alvin|@ lujie@@鲁洁|@ @@|@ family@@family|@ dalianjinyanhanzhuangpifashangxing@@大连金燕韩妆批发商行|@ zhouhuiqing@@周慧青|@ dongxiaojie@@董小姐|@ lannihanzhuang@@岚妮韩妆|@ Luc@@Luc|@ ganshilianmeng@@干事联盟|@ jiajia@@佳佳|@ doudoudou@@豆豆豆|@ lingling@@玲玲|@ renren@@仁仁|@ sunyongjing@@孙永晶|@ wudixiaofengzi@@无敌小疯子|@ xiaolajiaofangfang@@小辣椒芳芳|@ lvlei@@吕磊|@ suxiansheng@@苏先生|@ chenyongjie@@陈涌杰|@ dongjia@@冬家|@ wanxiansheng@@万先生|@ yishuiqianjin@@易水千金|@ yiyi@@依依|@ SZJtuandui@@SZJ团队|@ sijiashenghuo@@私嘉生活|@ fanmu@@凡木|@ pingguoxiaojie@@萍果小姐|@ binger@@冰儿|@ Line Team@@Line Team|@ guxiaotu@@古小兔|@ bingtanglianzi@@冰糖莲子|@ dannishiwo@@丹妮是我|@ AAaimolihanzhuang@@AA爱茉莉韩妆|@ weishangzongcang@@微商总仓|@ ruixianmaoyi@@锐贤贸易|@ xili@@喜力|@ 00@@00|@ feier@@飞儿|@ xidan@@曦丹|@ maomaotuandui@@毛毛团队|@ xinyu@@心雨|@ tongyankang@@童延康|@ dingyyquanqiugou@@丁yy全球购|@ mimi@@米米|@ beibeimama@@贝贝妈妈|@ jiajia@@嘉嘉|@ duma@@嘟妈|@ TOP@@TOP|@ quanqiuxianliang@@全球限量|@ chaohui@@朝卉|@ meixintuandui@@美心团队|@ langzijie@@浪子姐|@ Ssirendingzhi_mengmeng@@S私人订制-梦梦|@ diNicky@@迪Nicky|@ @@|@ xiaoqier@@小琪儿|@ AAAdingjizhengpinhanzhuangpifa@@AAA顶级正品韩妆批发|@ mike@@米可|@ baishikele@@百事可乐|@ keketuandui@@可可团队|@ ze@@泽|@ jiutong667@@九筒667|@ more@@more|@ cainiao@@蔡鸟|@ hanpinxiaopu@@韩品小铺|@ bazipo@@霸子破|@ longxiaoping@@龙啸平|@ jiajia@@佳佳|@ liyuan@@李渊|@ chengzihanzhuang_jingjing@@橙子韩妆-晶晶|@ wucong@@乌囱|@ dingyueguoji@@鼎悦国际|@ AAhanguodaigou@@AA韩国代购|@ 72@@72|@ xiaoQtuandui@@小Q团队|@ peipei@@佩佩|@ xiaoai@@小艾|@ pinger@@平儿|@ xiaocheng@@小程|@ juliguozi@@聚力郭仔|@ Lucy@@Lucy|@ jiakemeida@@嘉客美达|@ muzijiayu@@木子家鱼|@ F_@@F。|@ yangyang@@杨洋|@ yijianrugu@@一见如顾|@ xianbei@@仙贝|@ VVCCCC@@VVCCCC|@ VVCzhengpinshouquanshang@@VVC正品授权商|@ ailing@@爱玲|@ duoduo@@多多|@ huangxiansheng@@黄先生|@ xiaofeihanzhuang@@小飞韩妆|@ boluo@@波罗|@ meilinhanguodaigou@@美林韩国代购|@ xianxianyiren@@仙仙伊人|@ huamaohanzhuang@@花猫韩妆|@ Aayouya@@Aa优雅|@ Lucy@@Lucy|@ miduo@@米朵|@ fangfangma@@方方妈|@ haiyu@@海芋|@ anna@@anna|@ yanzi@@燕子|@ yangjun@@杨军|@ zivivi@@zivivi|@ mixi@@米西|@ juan@@娟|@ runjie@@润洁|@ huahuatuandui@@花花团队|@ damaohanzhuang@@大猫韩妆|@ qixuelian@@齐雪连|@ yezi@@叶子|@ chuangqi@@创奇|@ haizhiya@@海之崖|@ yueyue@@月月|@ lvpinxue@@吕品学|@ junjun@@骏骏|@ huwei@@胡为|@ zhiruchujian0099@@只如初见0099|@ jiulaolao@@舅姥姥|@ huige@@辉哥|@ kuba@@酷吧|@ Rae@@Rae|@ kangyanzhu@@康颜驻|@ fangfang@@芳芳|@ taozi@@桃子|@ qiuxiaoqiong@@裘晓琼|@ renren@@人人|@ nana@@娜娜|@ qicaijingzhuang@@七彩靓妆|@ qingtandonghanzhuang@@清潭洞韩妆|@ hh@@hh|@ zifei@@zifei|@ qingke@@庆可|@ lvfeimei@@吕飞美|@ zhuxiaoyun@@朱晓赟|@ yinyinxing@@银银行|@ tangge@@唐哥|@ chengxingongmao_danjie_@@诚鑫工贸(丹姐）|@ Crystal@@Crystal|@ niuniu@@妞妞|@ kekehufubaihuo@@可可护肤百货|@ songying@@songying|@ qiuzhijinghua@@秋之精华|@ adai@@阿呆|@ guoniu@@果妞|@ jackyhu@@jackyhu|@ xiaoboluo@@小菠萝|@ nuannuanjie@@暖暖姐|@ ajian@@啊剑|@ tong@@瞳|@ niuniu@@牛牛|@ xinle@@心乐|@ superrabbit@@superrabbit|@ zuoer@@左耳|@ zuanma@@钻妈|@ linlinhanzhuang@@琳琳韩妆|@ meiyoupin111@@美优品111|@ hanzhuangpifa@@韩妆批发|@ dingma@@叮妈|@ xiaoxuhanzhuang@@小旭韩妆|@ dalianmao@@大脸猫|@ zhanfang@@绽放|@ huihuishenghuoshangmao@@慧慧生活商贸|@ Beanjason@@Beanjason|@ vi_vi@@vi vi|@ Momo@@Momo|@ xiaowu@@小伍|@ yanyan@@妍妍|@ KISSBABY@@KISSBABY |@ huhuijie@@胡会杰|@ lili@@丽丽|@ @@|@ miaoxiaojie@@喵小姐|@ shenyanghanruimaoyi@@沈阳韩瑞贸易|@ hanhuodaigou@@韩货代购|@ chunchun@@纯纯|@ yezibaobao@@叶子宝宝|@ MISSBOBO@@MISSBOBO|@ @@|@ bohuan@@博峘|@ fensegediao@@粉色格调|@ maowang@@猫王|@ wang@@王|@ hjy@@hjy|@ hanjie@@韩杰|@ xuyingcui@@徐英翠|@ @@|@ houli@@侯莉|@ yangguang@@阳光|@ xiaodingdangmama@@小叮当妈妈|@ mayiya@@蚂蚁呀|@ juhanmeipin@@聚韩美品|@ azhuaidaigou@@a珠爱代购|@ lixiaotao@@李小涛|@ @@|@ xiaozhen@@小珍|@ lihaizhen@@李海珍|@ xiaolvmaoyi@@小吕贸易|@ qimo@@启墨|@ xiaoyuzhou59@@小宇宙59|@ youweiguliang@@有位菇凉|@ piaoyang@@漂洋|@ caiyun@@蔡云|@ jinger@@静儿|@ Wendy@@Wendy|@ caoxiaoli@@曹小丽|@ hanziweierdianshanghuiguan@@韩滋味儿电商会馆|@ xixi@@西西|@ xiaomi@@小米|@ mihua@@米花|@ xiaoduo@@小朵|@ zuanshilian@@钻石脸|@ wanmaoyoupin@@万茂优品|@ kuailedewuya@@快乐的乌鸦|@ huihuiyoupin@@惠惠优品|@ @@|@ qingqing@@晴晴|@ yaqibaobei@@雅琪宝贝|@ xiaofanqie@@小番茄|@ oabaix@@oabaix|@ xiaozhupeiqi@@小猪佩奇|@ cherrycoco@@cherrycoco|@ doumaquanqiugou@@兜妈全球购|@ zhanglei@@张磊|@ zhanyi@@战意|@ guibin@@贵宾|@ li@@丽|@ aiai@@艾艾|@ meimei@@美美|@ xili@@ 喜力|@ yinbaise@@银白色|@ lihuawuyu@@梨花无语|@ guzi@@谷子|@ lei@@磊|@ labeila@@拉贝拉|@ jinjiulanyou@@金玖兰优|@ enqishangmao@@恩琦商贸|@ lijingjing@@李静静|@ youruo@@幽若|@ sulvquanqiugou@@素缕全球购|@ miss_ yao@@miss. 姚|@ Sparkling@@Sparkling|@ tianyuanguoji@@田园国际|@ tongtongma@@彤彤妈|@ baobao@@宝宝|@ kinghaiwaigou@@king海外购|@ dahuamiaomiao@@大花喵喵|@ adu@@阿杜|@ daixiaoshuangquanqiugou@@戴晓双全球购|@ mahuma_waiwai@@马虎妈~歪歪|@ kainuo@@凯诺|@ wanghexiu@@王荷秀|@ yongyikeji@@永宜科技|@ dabaobeipili@@大宝贝霹雳|@ xiebin@@谢斌|@ yiyihanzhuang@@依依韩妆|@ xiaoheimei@@小黑妹|@ nuonuo@@诺诺|@ zoujinhua@@邹金华|@ lichiguoji@@力驰国际|@ zhaosha@@赵莎|@ qianqian@@千千|@ yuhan@@于涵|@ kuailexiangsui@@快乐相随|@ jiujiu@@九九|@ lu@@路|@ tiantian@@甜甜|@ xiaoshouzi@@小瘦子|@ lihui@@李辉|@ Xuer@@Xuer|@ peipei@@培培|@ xinlong@@鑫隆|@ ouyangjie@@欧阳杰|@ huangqing@@黄晴|@ zhiyin@@指引|@ bawan@@八万|@ hannilai@@韩妮俫|@ jinganshangmao@@晶安商贸|@ xingxing@@星星|@ xiaolehanzhuang@@小樂韓妝|@ abao@@阿宝|@ chenyiwei@@陈一伟|@ xiaoying@@小樱|@ zhengyongpeng@@郑永鹏|@ ligongzi@@李公子|@ shuoshuoma@@朔朔妈|@ zhenzhen@@贞贞|@ chenaihua@@陈爱华|@ qiye@@七页|@ jindoudou@@金豆豆|@ yangyang@@洋洋|@ jinping@@金萍|@ tingge@@挺哥|@ panjuanjuan@@潘娟娟|@ huangzhan@@黄展|@ xiangyang@@向阳|@ xiaoxi@@小西|@ ahui@@阿慧|@ quanshuichongkafei@@泉水冲咖啡|@ lefengVVC@@乐枫VVC|@ maizimama@@麦子麻麻|@ niuniu2017@@妞妞2017|@ xiaoxiongzaixian@@小熊在线|@ eleven@@eleven|@ huimeirenhanzhuangkefu@@慧美人韩妆客服|@ hanyu@@韩俞|@ jinchen@@金晨|@ yiyi@@一一|@ qingcaoqianqian@@青草浅浅|@ dan_ruo@@淡～若|@ pengdada@@鹏大大|@ duheqing@@杜何清|@ zhuzhu2007@@猪猪2007|@ xianchaodashangmao@@西安潮搭商贸|@ pingguo@@苹果|@ niqing@@倪晴|@ yifenqidai0@@一份期待0|@ shanghaiseqi@@上海瑟绮|@ rongrongma@@荣荣妈|@ mengmeng@@萌萌|@ Tracy Zhang@@Tracy Zhang|@ xianhuamama@@鲜花妈妈|@ daxue@@大雪|@ sunhuan@@孙欢|@ feifeifei@@飞飞飞|@ jianchunyan@@简春燕|@ xinma@@馨妈|@ zhaoqian@@赵倩|@ dongbeidaquVVC@@东北大区VVC|@ Mis_yao@@Mis.姚|@ meimeiquanqiugou@@美美全球购|@ runze@@润泽|@ ruimama@@睿麻麻|@ mengmeng0117@@萌萌0117|@ jiangsuxiajianjun@@江苏夏建军|@ gangzi@@刚子|@ duanguichu@@段贵初|@ janet@@janet|@ aishangmeilingshe@@爱上美玲社|@ shixiaowen@@史晓文|@ aibeierquanqiugoumuyingguan@@爱贝儿全球购母婴馆|@ yumeiren@@瑜美人|@ zengchunhua@@曾春花|@ chennvshi@@陈女士|@ jiumeige quanqiugou@@久美阁 全球购|@ waixingren@@外星人|@ womenzaishouer@@我们在首尔|@ wangpanpan@@王盼攀|@ jiangmingxin@@蒋明新|@ zhangwanyang@@张万阳|@ zhangteng@@张腾|@ weishangbaokuan@@微商爆款|@ sunlianjun@@孙连军|@ chenshaolin@@陈少林|@ kinny@@kinny|@ xuting@@许婷|@ haokandexiaojiejie@@好看的小姐姐|@ ruili@@瑞丽|@ panxiaoyang@@潘小样|@ @@|@ vvcdongshizhaodaili@@vvc董事招代理|@ yinuolekaixin@@伊诺乐开心|@ xiongyonghong@@熊永红|@ ruyimeizhuang@@如意美妆|@ dingxiaoxian@@丁小仙|@ yibao@@一宝|@ zhuoyueyoupin@@卓悦优品|@ xiaoxiaodawang@@笑笑大王|@ quanquan@@全全|@ @@|@ renshengwuchang@@人生无常|@ yangxiang@@扬翔|@ xiaolijie@@小莉姐|@ jiejie@@桔桔|@ yingying@@莹莹|@ chuanbiaoshangwu@@川彪商务|@ zhoumiaomiao@@周苗苗|@ shunxintuandui@@顺鑫团队|@ tiansenhuozhan@@天森货栈|@ tianmawuliu@@天马物流|@ feihua@@菲花|@ VVCjiangsuzongdaili@@VVC江苏总代理|@ yiwushilingjidianzishangwuyouxiangongsi@@义乌市凌纪电子商务有限公司|@ afa@@啊发|@ QQtang@@QQ糖|@ zheweiliuxiansheng@@这位刘先生|@ qianmo@@阡陌|@ rourouhanguodaigou@@肉肉韩国代购|@ muzimami@@木子妈咪|@ tiandihuachen@@天地华辰|@ Axiaoguo@@A小果|@ chenlu@@晨露|@ wujianxiong@@吴建雄|@ xiaowuhanzhuang@@小伍韩妆|@ CCquanqiuyouzhiziyuan@@CC全球优质资源|@ mumuli@@木木李|@ Nicolequanqiugougongzuoshi@@Nicole全球购工作室|@ dongjuan@@董娟|@ shasha@@莎莎|@ hongli@@洪丽|@ nini@@尼尼|@ zhangyan@@张延|@ paulfang@@paulfang|@ wuduomami@@五朵妈咪|@ x_r_kxiangrikui@@x r k向日葵|@ chengjunmaoyi@@成均贸易|@ VVCgongchangzhiyingmendian@@VVC工厂直营门店|@ chendehui@@陈德会|@ liuyang@@刘杨|@ huangbo@@黄波|@ dainishaiyueliang@@带你晒月亮|@ YOYOhanzhuang@@YOYO韩妆|@ litiantian@@李甜甜|@ chenchaocheng@@陈超成|@ xiaobo@@小波|@ xiangyanghuakai@@向阳花开|@ xinsuixuandong@@心随旋动|@ xiaoyantuandui@@晓燕团队|@ huazi@@华子|@ damao@@大猫|@ yawei@@雅玮|@ guzijia@@谷子家|@ guoguo@@果果|@ qianbaohua@@钱宝华|@ pinpin@@品品|@ xixili@@西西里|@ yunxuanhufupin@@云轩护肤品|@ heiniu@@黑牛|@ wangying@@王瑛|@ ajie@@阿杰|@ xuanxuanfanmeili@@萱萱贩美丽|@ jingege@@金格格|@ xiaojingangdezahuopu@@小金刚的杂货铺|@ chenmusu@@陈牡素|@ Inchaopin@@In潮品|@ hangzhougelibao@@杭州格丽宝|@ paopao@@泡泡|@ jiyuanchengshang_shanghai_maoyouxiangongsi@@骥媛骋商（上海）贸有限公司 |@ longxinge@@龙心歌|@ wanzhenchao@@万振超|@ huanglinhua@@黄林华|@ linxuechang@@林雪嫦|@ laojin@@老金|@ zhangjingxin@@张景昕|@ jingyan@@经燕|@ lebaijia@@樂佰家|@ beichen@@贝琛|@ hualianmao@@花脸猫|@ tiantianxiangshang@@天天向上|@ qinqinbaobei@@亲亲宝贝|@ baimudan@@白牡丹|@ pingshuixiangfeng@@萍水相逢|@ wangxiaochong@@王晓冲|@ xiaoliangvvc@@小梁vvc|@ wfname@@wfname|@ chengxiansheng@@程先生|@ qianhui@@芊汇|@ xiaowang@@小王|@ vvcshenzhenzongdai@@vvc深圳总代|@ fanfeifei@@凡菲菲|@ liuhongxia@@刘红霞|@ huahuazhandui@@花花战队|@ vvcchengse@@vvc橙色|@ lilu@@李陆|@ peipei123@@佩佩123|@ tiantian@@田甜|@ chenhuihui@@陈慧慧|@ junximaoyi@@俊希贸易|@ qilinquanqiugou@@麒麟全球购|@ huanglaoban@@黄老板|@ tianmaguojifan@@甜妈国际范|@ @@|@ liuchun@@刘纯|@ jinlu@@晋鲁|@ wenxuelian@@文雪莲|@ liaoran@@了然|@ mimi@@蜜蜜|@ zetao@@泽涛|@ huahuahuacai@@花花花菜|@ pipixiagenwozou@@皮皮虾跟我走|@ ruirui@@睿睿|@ vvcgaojidongshi@@vvc高级董事|@ MY@@MY|@ wanmaoyangyang@@万茂洋洋|@ VVCqijiandian@@VVC旗舰店|@ jingyuan@@京源|@ ayangongzuoshi@@阿燕工作室|@ paihuai@@徘徊|@ laozhang@@老张|@ @@|@ zaiyiqi@@在一起|@ wujiadashao@@吴家大少|@ @@|@ rui@@蕊|@ taizuo@@泰佐|@ baiqiaoshangmao@@百翘商贸|@ xiaozhenghanzhuang@@小郑韩妆|@ kailanpinpai@@凯蓝品牌|@ hujian@@胡鉴|@ maxiaozhuo@@马小卓|@ minminbaobei@@敏敏宝贝|@ xiaoqian@@小倩|@ xixi@@嘻嘻|@ xinxin@@鑫鑫|@ xiaoming@@小明|@ limin@@李敏|@ Dora@@Dora|@ linfeng@@林峰|@ mengyuan@@梦源|@ hanhuimin@@韩慧敏|@ qibuzouwujiwu@@齐步走物集屋|@ miaomiaoquanqiugou@@喵喵全球购|@ zhoutingvvcdongshi@@周婷vvc董事|@ nuannuan@@暖暖|@ wuwangchuxin@@勿忘初心|@ yangzhoushichidingshangmaoyouxiangongsi@@扬州市驰鼎商贸有限公司|@ zengyijieyouzahuopu@@曾姨解忧杂货铺|@ KBfenxiaohao_mofan@@KB分销号-魔范|@ zimohanzhuang@@紫陌韩妆|@ yufei@@羽霏|@ wanglin@@王林|@ xiaoxiaojin@@小小金|@ @@|@ hanyuanshihanzhuang@@韩缘式韩妆|@ yuexinquanqiugou@@悦鑫全球购|@ baijieshangmao@@百捷商贸|@ VVC xinmeng@@VVC 心梦|@ yangqi@@杨琦|@ shixiang@@诗香|@ VVCxianggangdongshi@@VVC香港董事|@ wangqiang@@王强|@ @@|@ zhanghui@@张辉|@ shenyangmanxishangmaoyouxiangongsi@@沈阳漫曦商贸有限公司|@ mavis@@mavis|@ haitaodeshi@@海淘的士|@ lingmeimei@@玲妹妹|@ meiluoniang@@美洛娘|@ niuma@@牛妈|@ qiaoniu@@俏妞|@ wubingkang@@吴炳康|@ shadingyu@@沙丁鱼|@ tuzi@@兔子|@ hongwei@@宏威|@ xianggangdadongshi@@香港大董事|@ @@|@ vip666@@vip666|@ fangjian@@方剑|@ aqiu@@阿邱|@ weisir@@魏sir|@ @@|@ xiaoxie@@小谢|@ HWjiashuquanqiugou@@HW家属全球购|@ xiaoluobo@@小萝卜|@ yingying@@盈盈|@ @@|@ ruimaweima@@睿妈威妈|@ qima@@七妈|@ zhangxinvvc@@zhangxinvvc|@ xuanzi@@玄子|@ Amy@@Amy|@ zhangyaya@@张丫丫|@ chenxi@@晨曦|@ @@|@ gegemeizhuang@@格格美妆|@ baiying@@白莹|@ leige@@磊哥|@ qiaojiaren@@俏佳人|@ h4@@h4|@ Alex@@Alex|@ hs@@黑色|@ VVCzs@@VVC招商|@ bbb@@布帮帮|@ hn@@哈娜|@ A_zjyp@@ A?仔家优品|@ ybmp@@引爆名品|@ fnhp@@芬娜韩品|@ yhhz@@樱花韩妆|@ mt@@馒头|@ jj@@晶晶|@ mjtd@@沐家团队|@ wmz@@微美姿|@ ye@@艳儿|@ hshsm@@慧生活商贸|@ xd@@小丹|@ llh@@李玲慧|@ zzx@@朱朱侠|@ bbmt@@八佰玛特|@ xy@@晓云|@ ab@@阿兵|@ xy@@小颖|@ xyxy@@星语心愿|@ lyx@@刘阳晓|@ xxbk@@小夏爆款|@ lhy@@刘鸿雁|@ xx@@欣欣|@ dmm@@大梦梦|@ sqq@@施青青|@ hclp@@恒灿礼品|@ asn@@爱是你|@ npc@@倪佩春|@ cplgzs@@诚品蓝工作室|@ fx@@丰行|@ xjwg@@训江微购|@ hylmyx@@汇英联盟一祥|@ gx@@高兴|@ xq@@闲趣|@ xxj@@谢晓娟|@ lt@@乐淘|@ gwl@@郭文龙|@ xpg@@小苹果|@ dm@@多麻|@ pzl@@瓶子玲|@ pg@@胖哥|@ @@|@ lK@@老K|@ djs@@大军师|@ Nuoge_hjy@@Nuoge-黄金眼|@ wy@@吴燕|@ Yclzg1972@@Yclzg1972|@ jj@@君君|@ jj@@尐洁|@ jj@@姜姐|@ VVCyzqz@@VVC一周琼珍|@ de@@朵儿|@ mj@@麻吉|@ vvcq@@vvc巧|@ hhHoney@@红红Honey|@ sdz@@书呆子|@ ty@@添翼|@ hz@@禾知|@ Fannie@@Fannie|@ NINA@@NINA|@ vvcds_Rush@@vvc懂事_Rush|@ lsh@@刘市海|@ ax@@爱雪|@ vvcmh@@vvc米花|@ Feynman@@Feynman|@ ay@@阿鱼|@ vvc_zk@@vvc?zk|@ cz@@陈振|@ VVC_S@@VVC-S|@ mt@@蜜桃|@ xx@@小熊|@ zlt@@周老头|@ wk@@悟空|@ yymm@@阳阳妈妈|@ ln@@莉娜|@ pxgj@@胖熊国际|@ 15858955822@@15858955822|@ myf@@莫妍飞|@ lby@@狼博雅|@ spring@@spring|@ xmm@@徐苗苗|@ yrhz@@伊人红妆|@ wxt@@吴晓甜|@ xnmz@@小宁美妆|@ wj@@王晶|@ xx@@湘湘|@ snlhgg@@涩女郎韩国馆|@ cbzhh@@长鼻子哼哼|@ tm@@图妈|@ yh@@杨欢|@ yj@@悦己|@ aml@@爱美丽|@ bcm@@毕传梅|@ hdfH_D_F@@黄丹凤H.D.F|@ VVCds@@VVC董事|@ xz@@晓忠|@ mt@@蜜桃|@ lbdcj@@联邦调查局|@ yzm@@羽之梦|@ spxhzpf@@尚品秀换装批发|@ be@@宝儿|@ hg@@浩哥|@ VVC_hhaml@@VVC-花花爱米粒|@ bingomama@@bingomama|@ VVC__ab@@VVC--啊冰|@ pyqstd@@朋友圈实体店|@ dd@@多多|@ yfy@@尤飞燕|@ yyzpd@@呦耶正品店|@ xlbysqm@@小笼包与沙琪玛|@ hgm@@胡国美|@ hqj@@胡青君|@ ybl@@杨蓓蕾|@ cc@@cc|@ dd@@东东|@ x@@雪|@ chen@@chen|@ ll@@琉璃|@ xr@@夏日|@ xm@@小马|@ xpqqg__xbmy@@西品全球购--西贝贸易|@ lh@@老胡|@ lj@@林洁|@ yz@@洋洲|@ tm@@糖妈|@ Easy@@Easy|@ hmr@@韩美人|@ qe@@清儿|@ tc555@@特纯555|@ tyhwx@@天宇韩味轩|@ qqhjbk@@清青汇集爆款|@ be@@冰儿|@ vick_ruan@@vick_ruan|@ na@@妮阿|@ lz@@良子|@ yl@@雅琳|@ JIN@@JIN|@ xcc@@小船长|@ WE_KO@@WE.KO|@ dldppz@@多伦多趴趴走|@ zyhz@@紫玉韩妆|@ xxx@@雪心星|@ nz@@南子|@ lxx@@卢小小|@ jj@@娟娟|@ hjw@@黄瑾雯|@ cc@@畅畅|@ cd@@程丹|@ xh@@徐惠|@ Ada_sxp@@Ada's小铺|@ bs@@标叔|@ ax@@阿啸|@ fwp@@蜂窝派|@ zm@@真美|@ VVCdsLoe@@VVC董事Loe|@ yx@@妍喜|@ wy@@汪洋|@ zxgm@@正玺工贸|@ shj@@施惠娟|@ hh@@涵涵|@ xsw@@西松屋|@ ss@@三水|@ jj@@佳佳|@ asa@@阿sa|@ sym@@淑羽梦|@ nz111@@妮子111|@ mkk@@梦柯柯|@ dx@@东旭|@ mi_le@@mi le|@ klm@@快乐猫|@ VVCzm@@VVC专卖|@ axjl@@爱新觉罗|@ haixia@@haixia|@ jj@@静静|@ xyy@@喜羊羊|@ nj@@牛津|@ smlslulu@@smlslulu|@ l@@龙|@ hbmm@@宏博妈妈|@ tt@@糖糖|@ xQ@@小Q|@ sun@@sun|@ VVCsshf_lx_@@VVC时尚护肤。龙秀。|@ NaNa@@NaNa|@ sm@@斯妈|@ y@@瀛|@ aq@@阿奇|@ sg@@孙国|@ lmclf@@辣妈潮流坊|@ xrds@@旭日东升|@ zftd@@兆丰团队|@ zhn@@赵韩娜|@ ldsx@@乐都商行|@ yt@@樱桃|@ shadow@@shadow|@ VVCds@@VVC董事|@ ls@@老舍|@ @@|@ VVCxy@@VVC小杨|@ jly@@舅姥爷|@ dddd@@点点滴滴|@ cc@@曹曹|@ xmmz@@小曼名妆|@ lingyun112386@@lingyun112386|@ wj@@文杰|@ xgnesang@@小哥nesang|@ xt@@小彤|@ bhs@@白桦树|@ dby@@多宝鱼|@ sytydsm@@沈阳腾亿达商贸|@ gg@@亘亘|@ zfr@@追风人|@ fc@@fc|@ glcp@@冠郎诚品|@ Alvin@@Alvin|@ lj@@鲁洁|@ @@|@ family@@family|@ dljyhzpfsx@@大连金燕韩妆批发商行|@ zhq@@周慧青|@ dxj@@董小姐|@ lnhz@@岚妮韩妆|@ Luc@@Luc|@ gslm@@干事联盟|@ jj@@佳佳|@ ddd@@豆豆豆|@ ll@@玲玲|@ rr@@仁仁|@ syj@@孙永晶|@ wdxfz@@无敌小疯子|@ xljff@@小辣椒芳芳|@ ll@@吕磊|@ sxs@@苏先生|@ cyj@@陈涌杰|@ dj@@冬家|@ wxs@@万先生|@ ysqj@@易水千金|@ yy@@依依|@ SZJtd@@SZJ团队|@ sjsh@@私嘉生活|@ fm@@凡木|@ pgxj@@萍果小姐|@ be@@冰儿|@ Line Team@@Line Team|@ gxt@@古小兔|@ btlz@@冰糖莲子|@ dnsw@@丹妮是我|@ AAamlhz@@AA爱茉莉韩妆|@ wszc@@微商总仓|@ rxmy@@锐贤贸易|@ xl@@喜力|@ 00@@00|@ fe@@飞儿|@ xd@@曦丹|@ mmtd@@毛毛团队|@ xy@@心雨|@ tyk@@童延康|@ dyyqqg@@丁yy全球购|@ mm@@米米|@ bbmm@@贝贝妈妈|@ jj@@嘉嘉|@ dm@@嘟妈|@ TOP@@TOP|@ qqxl@@全球限量|@ ch@@朝卉|@ mxtd@@美心团队|@ lzj@@浪子姐|@ Ssrdz_mm@@S私人订制-梦梦|@ dNicky@@迪Nicky|@ @@|@ xqe@@小琪儿|@ AAAdjzphzpf@@AAA顶级正品韩妆批发|@ mk@@米可|@ bskl@@百事可乐|@ kktd@@可可团队|@ z@@泽|@ jt667@@九筒667|@ more@@more|@ cn@@蔡鸟|@ hpxp@@韩品小铺|@ bzp@@霸子破|@ lxp@@龙啸平|@ jj@@佳佳|@ ly@@李渊|@ czhz_jj@@橙子韩妆-晶晶|@ wc@@乌囱|@ dygj@@鼎悦国际|@ AAhgdg@@AA韩国代购|@ 72@@72|@ xQtd@@小Q团队|@ pp@@佩佩|@ xa@@小艾|@ pe@@平儿|@ xc@@小程|@ jlgz@@聚力郭仔|@ Lucy@@Lucy|@ jkmd@@嘉客美达|@ mzjy@@木子家鱼|@ F_@@F。|@ yy@@杨洋|@ yjrg@@一见如顾|@ xb@@仙贝|@ VVCCCC@@VVCCCC|@ VVCzpsqs@@VVC正品授权商|@ al@@爱玲|@ dd@@多多|@ hxs@@黄先生|@ xfhz@@小飞韩妆|@ bl@@波罗|@ mlhgdg@@美林韩国代购|@ xxyr@@仙仙伊人|@ hmhz@@花猫韩妆|@ Aayy@@Aa优雅|@ Lucy@@Lucy|@ md@@米朵|@ ffm@@方方妈|@ hy@@海芋|@ anna@@anna|@ yz@@燕子|@ yj@@杨军|@ zivivi@@zivivi|@ mx@@米西|@ j@@娟|@ rj@@润洁|@ hhtd@@花花团队|@ dmhz@@大猫韩妆|@ qxl@@齐雪连|@ yz@@叶子|@ cq@@创奇|@ hzy@@海之崖|@ yy@@月月|@ lpx@@吕品学|@ jj@@骏骏|@ hw@@胡为|@ zrcj0099@@只如初见0099|@ jll@@舅姥姥|@ hg@@辉哥|@ kb@@酷吧|@ Rae@@Rae|@ kyz@@康颜驻|@ ff@@芳芳|@ tz@@桃子|@ qxq@@裘晓琼|@ rr@@人人|@ nn@@娜娜|@ qcjz@@七彩靓妆|@ qtdhz@@清潭洞韩妆|@ hh@@hh|@ zifei@@zifei|@ qk@@庆可|@ lfm@@吕飞美|@ zxy@@朱晓赟|@ yyx@@银银行|@ tg@@唐哥|@ cxgm_dj_@@诚鑫工贸(丹姐）|@ Crystal@@Crystal|@ nn@@妞妞|@ kkhfbh@@可可护肤百货|@ songying@@songying|@ qzjh@@秋之精华|@ ad@@阿呆|@ gn@@果妞|@ jackyhu@@jackyhu|@ xbl@@小菠萝|@ nnj@@暖暖姐|@ aj@@啊剑|@ t@@瞳|@ nn@@牛牛|@ xl@@心乐|@ superrabbit@@superrabbit|@ ze@@左耳|@ zm@@钻妈|@ llhz@@琳琳韩妆|@ myp111@@美优品111|@ hzpf@@韩妆批发|@ dm@@叮妈|@ xxhz@@小旭韩妆|@ dlm@@大脸猫|@ zf@@绽放|@ hhshsm@@慧慧生活商贸|@ Beanjason@@Beanjason|@ vi_vi@@vi vi|@ Momo@@Momo|@ xw@@小伍|@ yy@@妍妍|@ KISSBABY@@KISSBABY |@ hhj@@胡会杰|@ ll@@丽丽|@ @@|@ mxj@@喵小姐|@ syhrmy@@沈阳韩瑞贸易|@ hhdg@@韩货代购|@ cc@@纯纯|@ yzbb@@叶子宝宝|@ MISSBOBO@@MISSBOBO|@ @@|@ bh@@博峘|@ fsgd@@粉色格调|@ mw@@猫王|@ w@@王|@ hjy@@hjy|@ hj@@韩杰|@ xyc@@徐英翠|@ @@|@ hl@@侯莉|@ yg@@阳光|@ xddmm@@小叮当妈妈|@ myy@@蚂蚁呀|@ jhmp@@聚韩美品|@ azadg@@a珠爱代购|@ lxt@@李小涛|@ @@|@ xz@@小珍|@ lhz@@李海珍|@ xlmy@@小吕贸易|@ qm@@启墨|@ xyz59@@小宇宙59|@ ywgl@@有位菇凉|@ py@@漂洋|@ cy@@蔡云|@ je@@静儿|@ Wendy@@Wendy|@ cxl@@曹小丽|@ hzwedshg@@韩滋味儿电商会馆|@ xx@@西西|@ xm@@小米|@ mh@@米花|@ xd@@小朵|@ zsl@@钻石脸|@ wmyp@@万茂优品|@ kldwy@@快乐的乌鸦|@ hhyp@@惠惠优品|@ @@|@ qq@@晴晴|@ yqbb@@雅琪宝贝|@ xfq@@小番茄|@ oabaix@@oabaix|@ xzpq@@小猪佩奇|@ cherrycoco@@cherrycoco|@ dmqqg@@兜妈全球购|@ zl@@张磊|@ zy@@战意|@ gb@@贵宾|@ l@@丽|@ aa@@艾艾|@ mm@@美美|@ xl@@ 喜力|@ ybs@@银白色|@ lhwy@@梨花无语|@ gz@@谷子|@ l@@磊|@ lbl@@拉贝拉|@ jjly@@金玖兰优|@ eqsm@@恩琦商贸|@ ljj@@李静静|@ yr@@幽若|@ slqqg@@素缕全球购|@ miss_ y@@miss. 姚|@ Sparkling@@Sparkling|@ tygj@@田园国际|@ ttm@@彤彤妈|@ bb@@宝宝|@ kinghwg@@king海外购|@ dhmm@@大花喵喵|@ ad@@阿杜|@ dxsqqg@@戴晓双全球购|@ mhm_ww@@马虎妈~歪歪|@ kn@@凯诺|@ whx@@王荷秀|@ yykj@@永宜科技|@ dbbpl@@大宝贝霹雳|@ xb@@谢斌|@ yyhz@@依依韩妆|@ xhm@@小黑妹|@ nn@@诺诺|@ zjh@@邹金华|@ lcgj@@力驰国际|@ zs@@赵莎|@ qq@@千千|@ yh@@于涵|@ klxs@@快乐相随|@ jj@@九九|@ l@@路|@ tt@@甜甜|@ xsz@@小瘦子|@ lh@@李辉|@ Xuer@@Xuer|@ pp@@培培|@ xl@@鑫隆|@ oyj@@欧阳杰|@ hq@@黄晴|@ zy@@指引|@ bw@@八万|@ hnl@@韩妮俫|@ jasm@@晶安商贸|@ xx@@星星|@ xlhz@@小樂韓妝|@ ab@@阿宝|@ cyw@@陈一伟|@ xy@@小樱|@ zyp@@郑永鹏|@ lgz@@李公子|@ ssm@@朔朔妈|@ zz@@贞贞|@ cah@@陈爱华|@ qy@@七页|@ jdd@@金豆豆|@ yy@@洋洋|@ jp@@金萍|@ tg@@挺哥|@ pjj@@潘娟娟|@ hz@@黄展|@ xy@@向阳|@ xx@@小西|@ ah@@阿慧|@ qsckf@@泉水冲咖啡|@ lfVVC@@乐枫VVC|@ mzmm@@麦子麻麻|@ nn2017@@妞妞2017|@ xxzx@@小熊在线|@ eleven@@eleven|@ hmrhzkf@@慧美人韩妆客服|@ hy@@韩俞|@ jc@@金晨|@ yy@@一一|@ qcqq@@青草浅浅|@ d_r@@淡～若|@ pdd@@鹏大大|@ dhq@@杜何清|@ zz2007@@猪猪2007|@ xacdsm@@西安潮搭商贸|@ pg@@苹果|@ nq@@倪晴|@ yfqd0@@一份期待0|@ shsq@@上海瑟绮|@ rrm@@荣荣妈|@ mm@@萌萌|@ Tracy Zhang@@Tracy Zhang|@ xhmm@@鲜花妈妈|@ dx@@大雪|@ sh@@孙欢|@ fff@@飞飞飞|@ jcy@@简春燕|@ xm@@馨妈|@ zq@@赵倩|@ dbdqVVC@@东北大区VVC|@ Mis_y@@Mis.姚|@ mmqqg@@美美全球购|@ rz@@润泽|@ rmm@@睿麻麻|@ mm0117@@萌萌0117|@ jsxjj@@江苏夏建军|@ gz@@刚子|@ dgc@@段贵初|@ janet@@janet|@ asmls@@爱上美玲社|@ sxw@@史晓文|@ abeqqgmyg@@爱贝儿全球购母婴馆|@ ymr@@瑜美人|@ zch@@曾春花|@ cns@@陈女士|@ jmg qqg@@久美阁 全球购|@ wxr@@外星人|@ wmzse@@我们在首尔|@ wpp@@王盼攀|@ jmx@@蒋明新|@ zwy@@张万阳|@ zt@@张腾|@ wsbk@@微商爆款|@ slj@@孙连军|@ csl@@陈少林|@ kinny@@kinny|@ xt@@许婷|@ hkdxjj@@好看的小姐姐|@ rl@@瑞丽|@ pxy@@潘小样|@ @@|@ vvcdszdl@@vvc董事招代理|@ ynlkx@@伊诺乐开心|@ xyh@@熊永红|@ rymz@@如意美妆|@ dxx@@丁小仙|@ yb@@一宝|@ zyyp@@卓悦优品|@ xxdw@@笑笑大王|@ qq@@全全|@ @@|@ rswc@@人生无常|@ yx@@扬翔|@ xlj@@小莉姐|@ jj@@桔桔|@ yy@@莹莹|@ cbsw@@川彪商务|@ zmm@@周苗苗|@ sxtd@@顺鑫团队|@ tshz@@天森货栈|@ tmwl@@天马物流|@ fh@@菲花|@ VVCjszdl@@VVC江苏总代理|@ ywsljdzswyxgs@@义乌市凌纪电子商务有限公司|@ af@@啊发|@ QQt@@QQ糖|@ zwlxs@@这位刘先生|@ qm@@阡陌|@ rrhgdg@@肉肉韩国代购|@ mzmm@@木子妈咪|@ tdhc@@天地华辰|@ Axg@@A小果|@ cl@@晨露|@ wjx@@吴建雄|@ xwhz@@小伍韩妆|@ CCqqyzzy@@CC全球优质资源|@ mml@@木木李|@ Nicoleqqggzs@@Nicole全球购工作室|@ dj@@董娟|@ ss@@莎莎|@ hl@@洪丽|@ nn@@尼尼|@ zy@@张延|@ paulfang@@paulfang|@ wdmm@@五朵妈咪|@ x_r_kxrk@@x r k向日葵|@ cjmy@@成均贸易|@ VVCgczymd@@VVC工厂直营门店|@ cdh@@陈德会|@ ly@@刘杨|@ hb@@黄波|@ dnsyl@@带你晒月亮|@ YOYOhz@@YOYO韩妆|@ ltt@@李甜甜|@ ccc@@陈超成|@ xb@@小波|@ xyhk@@向阳花开|@ xsxd@@心随旋动|@ xytd@@晓燕团队|@ hz@@华子|@ dm@@大猫|@ yw@@雅玮|@ gzj@@谷子家|@ gg@@果果|@ qbh@@钱宝华|@ pp@@品品|@ xxl@@西西里|@ yxhfp@@云轩护肤品|@ hn@@黑牛|@ wy@@王瑛|@ aj@@阿杰|@ xxfml@@萱萱贩美丽|@ jgg@@金格格|@ xjgdzhp@@小金刚的杂货铺|@ cms@@陈牡素|@ Incp@@In潮品|@ hzglb@@杭州格丽宝|@ pp@@泡泡|@ jycs_sh_myxgs@@骥媛骋商（上海）贸有限公司 |@ lxg@@龙心歌|@ wzc@@万振超|@ hlh@@黄林华|@ lxc@@林雪嫦|@ lj@@老金|@ zjx@@张景昕|@ jy@@经燕|@ lbj@@樂佰家|@ bc@@贝琛|@ hlm@@花脸猫|@ ttxs@@天天向上|@ qqbb@@亲亲宝贝|@ bmd@@白牡丹|@ psxf@@萍水相逢|@ wxc@@王晓冲|@ xlvvc@@小梁vvc|@ wfname@@wfname|@ cxs@@程先生|@ qh@@芊汇|@ xw@@小王|@ vvcszzd@@vvc深圳总代|@ fff@@凡菲菲|@ lhx@@刘红霞|@ hhzd@@花花战队|@ vvccs@@vvc橙色|@ ll@@李陆|@ pp123@@佩佩123|@ tt@@田甜|@ chh@@陈慧慧|@ jxmy@@俊希贸易|@ qlqqg@@麒麟全球购|@ hlb@@黄老板|@ tmgjf@@甜妈国际范|@ @@|@ lc@@刘纯|@ jl@@晋鲁|@ wxl@@文雪莲|@ lr@@了然|@ mm@@蜜蜜|@ zt@@泽涛|@ hhhc@@花花花菜|@ ppxgwz@@皮皮虾跟我走|@ rr@@睿睿|@ vvcgjds@@vvc高级董事|@ MY@@MY|@ wmyy@@万茂洋洋|@ VVCqjd@@VVC旗舰店|@ jy@@京源|@ aygzs@@阿燕工作室|@ ph@@徘徊|@ lz@@老张|@ @@|@ zyq@@在一起|@ wjds@@吴家大少|@ @@|@ r@@蕊|@ tz@@泰佐|@ bqsm@@百翘商贸|@ xzhz@@小郑韩妆|@ klpp@@凯蓝品牌|@ hj@@胡鉴|@ mxz@@马小卓|@ mmbb@@敏敏宝贝|@ xq@@小倩|@ xx@@嘻嘻|@ xx@@鑫鑫|@ xm@@小明|@ lm@@李敏|@ Dora@@Dora|@ lf@@林峰|@ my@@梦源|@ hhm@@韩慧敏|@ qbzwjw@@齐步走物集屋|@ mmqqg@@喵喵全球购|@ ztvvcds@@周婷vvc董事|@ nn@@暖暖|@ wwcx@@勿忘初心|@ yzscdsmyxgs@@扬州市驰鼎商贸有限公司|@ zyjyzhp@@曾姨解忧杂货铺|@ KBfxh_mf@@KB分销号-魔范|@ zmhz@@紫陌韩妆|@ yf@@羽霏|@ wl@@王林|@ xxj@@小小金|@ @@|@ hyshz@@韩缘式韩妆|@ yxqqg@@悦鑫全球购|@ bjsm@@百捷商贸|@ VVC xm@@VVC 心梦|@ yq@@杨琦|@ sx@@诗香|@ VVCxgds@@VVC香港董事|@ wq@@王强|@ @@|@ zh@@张辉|@ symxsmyxgs@@沈阳漫曦商贸有限公司|@ mavis@@mavis|@ htds@@海淘的士|@ lmm@@玲妹妹|@ mln@@美洛娘|@ nm@@牛妈|@ qn@@俏妞|@ wbk@@吴炳康|@ sdy@@沙丁鱼|@ tz@@兔子|@ hw@@宏威|@ xgdds@@香港大董事|@ @@|@ vip666@@vip666|@ fj@@方剑|@ aq@@阿邱|@ wsir@@魏sir|@ @@|@ xx@@小谢|@ HWjsqqg@@HW家属全球购|@ xlb@@小萝卜|@ yy@@盈盈|@ @@|@ rmwm@@睿妈威妈|@ qm@@七妈|@ zhangxinvvc@@zhangxinvvc|@ xz@@玄子|@ Amy@@Amy|@ zyy@@张丫丫|@ cx@@晨曦|@ @@|@ ggmz@@格格美妆|@ by@@白莹|@ lg@@磊哥|@ qjr@@俏佳人|@ `,
            keywords: {
                username: '',
                order_id: '',
                goods_id: ''
            },

        }
        },
        created() {
            window.addEventListener("keydown", (e) => {
                console.log(e);
                if (e.keyCode === 13 && (this.keywords.username !== '' || this.keywords.order_id !== '' || this.keywords.goods_id !== '')) {
                    this.searchorder();
                }
            })
        },
        methods: {

            select(val) {
                this.keywords.username = val;
                this.search_result = [];
                this.searchorder()
            },
            searchorder() {
                $.ajax({
                    type: 'post',
                    url: 'https://api.vvc.tw/suc/order/ordersearch',
                    data: this.keywords,
                    success: (res) => {
                        console.log(res);
                        if (res.code >0) {
                            this.lists = res.data;
                            // this.category = res.data.category;
                            console.log(this.lists);

                            // this.keywords = {username: '', order_id: '', goods_id: ''};
                            this.search_result=[]
                        }

                        layer.msg('查询完成');

                    }
                })
            },
            goto_detail(index) {
                window.location.href = 'order-modify.html?id=' + index.id
            },
            search_name() {

                this.search_result = [];
                var str = this.keywords.username;

                if (str !== '') {
                    var tem_str = str.split("");
                    var regs = "";
                    for (var i in tem_str) {
                        regs += tem_str[i] + "[\\w]*"
                    }
                    console.log(regs);

                    var reg = new RegExp(" " + str + '.*?@@([^@]+?)\\|@|' + '@@[^@]*' + str + "[^@]*?\\|@", "ig");

                    var back2 = this.text.match(reg);
                    var value;

                    for (value in back2) {
                        if (this.search_result.length < 20) {
                            this.search_result.push(back2[value].match('@@(.*?)\\|@')[1]);
                        }
                    }

                    // var reg = new RegExp(regs+'.*?@@([^@]+?)\\|@',"ig");
                    var reg = new RegExp(regs + '@@[^@]+\\|@', "ig");

                    var back2 = this.text.match(reg);
                    // console.log(back2);
                    var value;

                    for (value in back2) {
                        if (this.search_result.length < 20) {
                            this.search_result.push(back2[value].match('@@(.*?)\\|@')[1]);

                        }
                    }

                    this.search_result = Array.from(new Set(this.search_result));
                    console.log(this.search_result);
                } else {
                    this.search_result = []
                }
            }
        }
    }
</script>

<style scoped>
    #app {
        padding: 20px;
        width: 100%;
    }
    .search_title{
        width: 50%;
        margin: 0 auto;
        border: 1px solid #c2c2c2;
        padding: 20px;
    }
    .search_title h2{
        line-height: 36px;
        text-align: center;
    }
    .search_order_btn{
        width: 50px;
        line-height: 35px;
        margin-left: 20px;
        background: #2c69c9;
        color:white;
        border: none;
    }
    .search_order{
        line-height: 36px;
        border: 1px solid #c2c2c2;
    }
    .search_name{
        margin: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .search{
        line-height: 35px;
        border: 1px solid #ddd;
    }
    .search_name1{
        margin: 0 30px;
        display: flex;
        align-items: center;
    }
    .form{
        display: inline-block;
        padding: 15px 20px;
        border: 1px solid #ddd;
    }
    h2 {
        line-height: 40px;
    }
    .search {
        position: relative;
    }
    .search-result {
        position: absolute;
        z-index: 100;
        width: 50%;
        list-style: none;
        border: 1px solid #ddd;
        border-bottom: none;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .search-result li{
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        line-height: 30px;
    }
    .search-result li:hover{
        background-color: #eee;
    }
    .tips {
        color: #bbb;
        font-size: 28px;
    }
    .layui-table th{
        text-align: center;
    }
    /*
    */
</style>
