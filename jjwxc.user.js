// ==UserScript==
// @name        晋江文学城净化脚本
// @namespace   monkey-script-jjwxc
// @license MIT 
// @version     0.0.4
// @description 隐藏部分作者，作品，标签

// @updateURL   https://github.com/TxvVS8c3vC/monkey-script-jjwxc/raw/master/jjwxc.user.js
// @downloadURL https://github.com/TxvVS8c3vC/monkey-script-jjwxc/raw/master/jjwxc.user.js

// @match        http://*.jjwxc.net/*

// @require https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @grant GM_log

// @run-at       document-start
// ==/UserScript==

let goodAuthors = /尾鱼|水心沙/

let goodNovels = {
  "推理": [
    /寻郎/,
    /晴天遇暴雨/,
  ],
  "灵异": [
    /冥公子/,
    /我不是大师/
  ]
}


let badAuthors = /priest|大风刮过|墨香铜臭|淮上|水千丞|巫哲|非天夜翔/

let badNovels = [
  /某书/
]

let badKeywords = /高考|爹|叔叔|\[综|弹幕|DIO|三国|攻略|快穿|六零|八零|七零|九零|女皇|军嫂|清穿|抽卡|电竞|花滑|女团|神明|白月光|团宠|为夫|老公|娇|男O|男o|直播|全班|全校|跑团|\[锁\]|无限|密室|游戏|短文|短篇|全家/

let badTypes = /衍生|纯爱|连载/

let nanZhuWuCP = /功德簿/



let selector = 'table:not(#oneboolt):not(#fav_author_table) tr'

function hide(elem) {
  if (elem) {

    let div = elem.parents('#search_result div:not(.info)')
    let hr = div.next()
    if (div && div.html()) {
      div.hide()
      hr.hide()
    }

    div = elem.parent('h3').parent('#search_result div')
    hr = div.next()
    if (div && div.html()) {
      div.hide()
      hr.hide()
    }

    let tr = elem.parents(selector)

    if (tr && tr.html() && !(tr.html().includes('文案') || tr.html().includes('晋江APP') || tr.html().includes('search_result') || tr.html().includes('comment'))) {
      tr.hide()
    }
  }
}


$(document).ready(function () {


  $('.check span:contains(女主)').prev().prop('checked', true);
  $('.check span:contains(女主)').parents('.optionsArea').find('input').first().prop('checked', false);

  $('.check span:contains(言情)').prev().prop('checked', true);
  $('.check span:contains(言情)').parents('.optionsArea').find('input').first().prop('checked', false);

  $('.check span:contains(无CP)').prev().prop('checked', true);
  $('.check span:contains(无CP)').parents('.optionsArea').find('input').first().prop('checked', false);

  $('.check span:contains(原创)').prev().prop('checked', true);
  $('.check span:contains(原创)').parents('.optionsArea').find('input').first().prop('checked', false);


  $('.readtd').each(function (index) {
    if (index === 1) {
      $(this).hide()
    }
  })

  $('.lefttd').each(function (index) {
    if (index === 1) {
      $(this).hide()
    }
  })


  $("a").each(function () {
    let text = $(this).text()

    
    let goodNovelArray = []
    for (const [key, value] of Object.entries(goodNovels)) {
      goodNovelArray.push(...value)
    }
    
    if (
      /^.\*\*\*\*\*\*\*.$/.test(text) ||
      badAuthors.test(text) ||
      badNovels.some(rx => rx.test(text)) ||
      goodAuthors.test(text) ||
      goodNovelArray.some(rx => rx.test(text)) ||
      // 标题内关键词屏蔽
      badKeywords.test(text) ||
      // 男主无CP文屏蔽
      nanZhuWuCP.test(text)
      ) {
      hide($(this))
    }
  })

  $('td').each(function () {
    let text = $(this).html()
    if (
      // 字数为零的小说屏蔽
      text === '0&nbsp;' ||
      // 类型屏蔽
      badTypes.test(text) ||
      // 连载文屏蔽
      /连载/.test(text)
    ) {
      hide($(this))
    }
  })

  $('.info').each(function () {
    let text = $(this).html()
    if (
      // 字数为零的小说屏蔽
      text === '0&nbsp;' ||
      // 类型屏蔽
      badTypes.test(text) ||
      // 连载文屏蔽
      /连载/.test(text)
    ) {
      hide($(this))
    }
  })

})


