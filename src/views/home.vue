<template>
	<div id="main">
		<header id="header">
			<img src="../assets/images/music.png" class="music btn">
			<input type="text" class="searchInput" v-model.trim="searchParams.key" placeholder="搜索音乐、歌手、歌词">
			<img src="../assets/images/search2.png" class="search btn" 
				@click="search"
				v-show="searchList.length === 0">
			<img src="../assets/images/cancel.png" class="cancel btn"
				@click="cancel" 
				v-show="searchList.length > 0">
		</header>
		<ul class="searchList" v-show="searchList.length > 0">
			<li class="searchItem" v-for="item in searchList">
				<div class="song searchContent">{{item.name}}</div>
				<div class="singer searchContent">{{item.singer}}</div>
			</li>
		</ul>
		<div class="hotTop" v-if="searchList.length === 0">
			<h2 class="title">
				热门榜单
			</h2>
			<ul class="hotList">
				<li class="hot" v-for="item in topList">
					<img :src="item.picUrl" alt="item.topTitle">
				</li>
			</ul>
		</div>
		<audio src="" controls></audio>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索参数
				searchParams: {
					key: '',
					g_tk:5381,
					loginUin:0,
					hostUin:0,
					format:'jsonp',
					inCharset:'utf8',
					outCharset:'utf-8',
					notice:0,
					platform:'yqq',
					needNewCode:0,
				},

				// 榜单参数
				topParams: {
					format:'jsonp',
					g_tk:5381,
					uin:0,
					format:'jsonp',
					inCharset:'utf-8',
					outCharset:'utf-8',
					notice:0,
					platform:'h5',
					needNewCode:1,
					_:1476804577179,
				},

				// 榜单列表
				topList: [],
				searchList: []
			}
		},

		created() {
			this.getTop()
		},

		methods: {
			// 搜索歌曲
			search() {
				this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {params: this.searchParams, jsonp: 'jsonpCallback'}).then((response) => {
					if (response.data.code === 0) {
						this.searchList = response.data.data.song.itemlist
					}
				})
			},

			// 获取榜单
			getTop() {
				this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {params: this.topParams, jsonp: 'jsonpCallback'}).then((response) => {
					this.topList = response.data.data.topList
				})
			},

			// 取消
			cancel() {
				this.searchList = []
				this.searchParams.key = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	#main{
		width: 100%;
		padding-top: 1.466667rem;
		background-color: #fff;
	}

	#header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.466667rem;
		background-color: #d43c33;

		.searchInput{
			position: absolute;
			width: 5.413333rem;
			height: 0.92rem;
			top: 50%;
			left: 50%;
			padding-left: 1.2rem;
			background: url(../assets/images/search.png) 0.533333rem center no-repeat;
			background-size: 0.4rem;
			background-color: #fff;
			transform: translate3d(-50%, -50%, 0);
			border-radius: 0.066667rem;
			border: none;
			outline: none;
			color: #d1d1d3;
		}

		.btn{
			position: absolute;
			width: 0.666667rem;
			top: 50%;
			transform: translate3d(0, -50%, 0);
			// pointer-events: none;
		}

		.music{
			left: 0.413333rem;
		}

		.search, .cancel{
			right: 0.413333rem;
		}
	}

	.searchList{
		width: 90%;
		margin: 0 auto;
		background-color: #fff;

		.searchItem{
			border-bottom: 1px solid #d1d1d3;
		}

		.searchContent{
			width: 100%;
			padding: 0.133333rem 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.song{
			color: #000;
			font-size: 0.48rem;
			font-weight: bold;
		}

		.singer{
			color: #454646;
			font-size: 0.346667rem;
		}
	}

	.title{
		width: 100%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		text-indent: 1.066667rem;
		font-size: 0.4rem;
		background: url(../assets/images/hot.png) 0.333333rem center no-repeat;
		background-size: 0.533333rem;
	}

	.hotList{
		width: 9.386667rem;
		margin: 0 auto;
		padding-bottom: 0.266667rem;
		font-size: 0;

		.hot{
			display: inline-block;
			margin-top: 0.133333rem;
			&:not(:nth-child(3n)){
				margin-right: 0.12rem;
			}

			img{
				width: 2.986667rem;
				height: 2.986667rem;
			}
		}
	}
</style>