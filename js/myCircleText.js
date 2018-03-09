/**
 * 	对象： 属性和行为，属性和方法（函数）的集合
 *  进度条的：
 *	属性：width,height,x,y,outerStyle,innerStyle,
 *		  outerRadius,innerRadius
 *	行为：把组添加到层：addToGroupOrLayer( arg );
 */

function CircleText( option ) {
	// 构造函数默认执行初始化工作
	this._init( option );
}

CircleText.prototype = {
	// 初始化方法
	_init: function( option ) {
		this.x = option.x || 0;		//圆形组的中心点坐标
		this.y = option.y || 0;
		this.innerRadius = option.innerRadius || 0;		//内圆半径
		this.outerRadius = option.outerRadius || 0;
		this.text = option.text || 'canvas';			//圆内的文字
		this.innerStyle = option.innerStyle || 'red';	//内圆的填充样式
		this.outerStyle = option.outerStyle || 'blue';	//外圆的填充样式

		// 创建一个组 包含 圆和文字
		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});

		// 初始化圆 图形
		var innerCircle = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.innerRadius,
			fill: this.innerStyle,
			opacity: .8
		});
		this.group.add(innerCircle);

		// 初始化外环
		var outerRing = new Konva.Ring({	//初始化一个圆环
			x: 0,
			y: 0,
			innerRadius: this.innerRadius,	//内圆的半径
			outerRadius: this.outerRadius,  //外圆的半径
			fill: this.outerStyle,			//圆环的填充的样式
			opacity: .3						//透明度
		});
		//把外环，添加到组内
		this.group.add( outerRing );

		// 初始化文字
		var text = new Konva.Text({
			x: 0 - this.outerRadius,
			y: -7,
			width: this.outerRadius * 2,//文字的宽度
			fill: '#fff',			    //文字的颜色
			fontSize: 17,				//文字的大小
			text: this.text,			//文字的内容
			align: 'center',			//居中显示
			fontStyle: 'bold'			//字体加粗
		});
		this.group.add( text );
	},
	// 把组添加到层
	addToGroupOrLayer: function( arg ) {
		arg.add(this.group);
	}
}