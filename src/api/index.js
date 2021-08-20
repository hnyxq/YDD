import axios  from '../plugins/http'
import base from './base'

const api = {
    // 获取轮播图信息
    getBannerList(){
        return axios.get(base.baseUrl+base.bannerUrl)
    },
    // 获取歌曲详情
    getSongUrlList(params){
        return axios.get(base.baseUrl+base.songUrl,{
            params:params
        })
    },
    getMvDetailList(params){
        return axios.get(base.baseUrl+base.mvDetailUrl,{
            params:params
        })
    },
    getAlbumDetailList(params){
        return axios.get(base.baseUrl+base.albumDetailUrl,{
            params:params
        })
    },
    getSongDetailList(params){
        return axios.get(base.baseUrl+base.songDetailUrl,{
            params:params
        })
    },
    getSongLyric(params){
        return axios.get(base.baseUrl+base.songLyricUrl,{
            params:params
        })
    },
    getHotList(params){
        return axios.get(base.baseUrl+base.hotListUrl,{
            params:params
        })
    },
    getMvList(params){
        return axios.get(base.baseUrl+base.mvUrl,{
            params:params
        })
    },
    getSongRankList(params){
        return axios.get(base.baseUrl+base.songRankUrl,{
            params:params
        })
    },
    getRzSingerList(params){
        return axios.get(base.baseUrl+base.rzSingerUrl,{
            params:params
        })
    },
    getSongList(){
        return axios.get(base.baseUrl+base.songListUrl)
    },
    getSongListDetail(params){
        return axios.get(base.baseUrl+base.songListDetailUrl,{
            params:params
        })
    },
    getRelatedSongList(params){
        return axios.get(base.baseUrl+base.relatedSongList,{
            params:params
        })
    },
    getRelatedAlbumList(params){
        return axios.get(base.baseUrl+base.relatedAlbumList,{
            params:params
        })
    },
    getLogin(params){
        return axios.post(base.baseUrl+base.login,params)
    },
    getUserDetailList(params){
        return axios.get(base.baseUrl+base.userDetailList,{
            params:params
        })
    },
    getSingerDetail(params){
        return axios.get(base.baseUrl+base.singerDetail,{
            params:params
        })
    },
    getSearchSuggest(params){
        return axios.get(base.baseUrl+base.searchSuggest,{
            params:params
        })
    },
    getSearchList(params){
        return axios.get(base.baseUrl+base.searchList,{
            params:params
        })
    },
    getSingerSongsList(params){
        return axios.get(base.baseUrl+base.singerSongsList,{
            params:params
        })
    },
    getSingerAlbumsList(params){
        return axios.get(base.baseUrl+base.singerAlbumsList,{
            params:params
        })
    },
    getSingerMvsList(params){
        return axios.get(base.baseUrl+base.singerMvsList,{
            params:params
        })
    },
    getUserPlaylist(params){
        return axios.get(base.baseUrl+base.userPlaylist,{
            params:params
        })
    },
    getUserSingerList(params){
        return axios.get(base.baseUrl+base.userSingerList,{
            params:params
        })
    },
    getLoveList(params){
        return axios.get(base.baseUrl+base.loveList,{
            params:params
        })
    },
    getLikeList(params){
        return axios.get(base.baseUrl+base.likeList,{
            params:params
        })
    },
    getUserFollow(params){
        return axios.get(base.baseUrl+base.userFollow,{
            params:params
        })
    },
}

export default api