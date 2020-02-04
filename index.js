var dataController = (function() {

  var Person = function(id,name,phoneNo) {
    this.id = id;
    this.n = name;
    this.p = phoneNo;
  };


  var data = [];

  return {
    addItem : function(name,phoneNo){
      var newItem,ID;

      if(data.length>0)
      {
        ID = data[data.length-1].id + 1;
      }
      else
      {
        ID = 0;
      }
      newItem = new Person(ID,name,phoneNo);
      data.push(newItem);
      console.log(newItem);
      return newItem;
    },

    findItem : function(name){
      var names,index;
      names = data.map(function(cur){
        return cur.n;
      });
      console.log(names);
      index = names.indexOf(name);
      // console.log(index);
      if(index === -1)
      {
        return -1;
      }
      return data[index].p;
    },

    testDisp : function()
    {
      console.log(data);
    },

    deleteItem : function(ar) {
      var ids,index;
      ids = data.map( function (curr) {
        return curr.id;
      });
      console.log(ids);
      index = ids.indexOf(ar);

      if(index!==-1)
      {
        data.splice(index,1);
      }
      console.log(data);
    }

  };
})();


var myUIController = (function() {

  return {
    getInput : function() {
      return {
        name : document.getElementById('exampleInput1').value,
        phoneNo : document.getElementById('exampleInput2').value
      };
    },

    getSearchInput :function() {
        return {
          name : document.getElementById('exampleInput3').value
        };
    },

    dispResult: function(num) {
      // console.log(num);
      if(num===-1)
      {
          document.getElementById('exampleInput4').placeholder = "Not Found";
      }
      else
      {
        document.getElementById('exampleInput4').placeholder =num;
      }

    },

    addListItem : function(obj) {
      var html,newHtml;
      html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button type="button" class="btn btn-primary btn-sm">X</button> </div></div></div>';
      console.log(obj.n);
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%',obj.n);
      newHtml = newHtml.replace('%value%', obj.p);

      document.querySelector('.book').insertAdjacentHTML('beforeend',newHtml);

    },

    clearFields : function() {
      var fields, fieldArr;
      fields = document.querySelectorAll('.namee, .numee, .searchee , .resultee');
      fieldArr = Array.prototype.slice.call(fields);
      document.getElementById('exampleInput4').placeholder="Result";
      fieldArr.forEach( function(curr,idx,arr) {
        curr.value = "";
        fieldArr[0].focus();
      });
    },

    deleteListItem : function(selectorId)
    {
      var ele = document.getElementById(selectorId);
      ele.parentNode.removeChild(ele);
    }

  };

})();

var controller = (function(myUIctrl,myDatactrl) {

  var setupEventListener = function() {
      document.querySelector('#addBtn').addEventListener('click',ctrlAddItem);

      document.querySelector('.book').addEventListener('click',ctrlDelItem);

      document.querySelector('#serBtn').addEventListener('click',searchItem);
  };
  var ctrlAddItem = function() {
    var input,item;
    input = myUIctrl.getInput();
    if(input.name !== "" && input.phoneNo !== "")
    {
      item = myDatactrl.addItem(input.name,input.phoneNo);
      console.log(item);
      myUIctrl.addListItem(item);
    }
    myUIctrl.clearFields();

  };

  var searchItem = function() {
    var input,num;
    input = myUIController.getSearchInput();
    console.log(input.name);
    num = myDatactrl.findItem(input.name);
    myUIController.dispResult(num);
    console.log(num);
  };

  var ctrlDelItem = function(event) {
    var splitId,ID;
    var itemId = event.target.parentNode.parentNode.parentNode.id;
    console.log(itemId);

    if(itemId)
    {
      splitId = itemId.split('-');
      ID = parseInt(splitId[1]);
    }

    myDatactrl.deleteItem(ID);
    myUIController.deleteListItem(itemId);
  };

  return {
    init : function() {
      console.log("Started");
      setupEventListener();
    }
  };
})(myUIController,dataController);

controller.init();