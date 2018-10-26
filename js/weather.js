var data = [{
  tag: "taipei_city",
  place: "臺北市",
}, {
  tag: "new_taipei_city",
  place: "新北市",
}, {
  tag: "taichung_city",
  place: "臺中市",
}, {
  tag: "tainan_city",
  place: "臺南市",
}, {
  tag: "kaohsiung_city",
  place: "高雄市",
}, {
  tag: "keelung_city",
  place: "基隆市",
}, {
  tag: "taoyuan_country",
  place: "桃園市",
}, {
  tag: "hsinchu_city",
  place: "新竹市",
}, {
  tag: "hsinchu_country",
  place: "新竹縣",
}, {
  tag: "miaoli_country",
  place: "苗栗縣",
}, {
  tag: "changhua_country",
  place: "彰化縣",
}, {
  tag: "nantou_country",
  place: "南投縣",
}, {
  tag: "yunlin_country",
  place: "雲林縣",
}, {
  tag: "chiayi_city",
  place: "嘉義市",
}, {
  tag: "chiayi_country",
  place: "嘉義縣",
}, {
  tag: "pingtung_country",
  place: "屏東縣",
}, {
  tag: "yilan_country",
  place: "宜蘭縣",
}, {
  tag: "hualien_country",
  place: "花蓮縣",
}, {
  tag: "taitung_country",
  place: "臺東縣",
}, {
  tag: "penghu_country",
  place: "澎湖縣",
}, {
  tag: "kinmen_country",
  place: "金門縣",
}, {
  tag: "lienchiang_country",
  place: "連江縣",
}];


window.onload = function () {
  var place_data = []

  var data_id = 'F-C0032-001'
  var api_key = 'CWB-D4A7B39A-ECAD-43ED-8667-03182B2D93D3'
  var url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/' + data_id + '?Authorization=' + api_key + '&format=JSON'

  axios.get(url)
    .then(function (response) {
      console.log(response)
      $(".spinner").hide();
      $("#app").show();
      var node = response.data.cwbopendata.dataset.location

      for (var i = 0; i < node.length; i++) {
        var val = node[i].locationName

        var index = data.findIndex(function (item, i) {
          return item.place === val
        });

        place_data.push({
          tag: data[index].tag,
          location_name: node[i].locationName,
          weather: node[i].weatherElement[0].time[0].parameter.parameterName,
          max_temperature: node[i].weatherElement[1].time[0].parameter.parameterName,
          min_temperature: node[i].weatherElement[2].time[0].parameter.parameterName
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  var vm = new Vue({
    el: "#app",
    data: {
      filter: "",
      place_data: place_data
    },
    computed: {
      now_area: function () {
        var tag_name = $(this).attr("id")
        var vobj = this
        var result = this.place_data.filter(function (obj) {
          return obj.tag == vobj.filter
        })
        if (result.length == 0) {
          return null;
        }
        return result[0];
      }
    }
  });

  $(document).ready(function () {
    $("path").mouseenter(function (e) {
      var tag_name = $(this).attr("id")
      vm.filter = tag_name
    })
  })
}