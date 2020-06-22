// ------------------------------------------
// Espionnage de barbares par Ichiro
// Script pour http://www.guerretribale.fr/
// ------------------------------------------

/*****************************************************************************************
 *
 *                         MapDB module
 *
 *
 ****************************************************************************************/

function loadVillages(url) {
  return new Promise(function (resolve, reject) {
      $.ajax( {
        'url': (url || window.location.origin + '/map/village.txt'),
        'async':true,
        'dataType':'text',
        'type':'GET',
        'error':function(req,status,err){reject(status);},
        'success':function(data,status,req){
            // TODO: avoid blocking call - cut in many steps
            console.time("Parsing");
          var villages = [];
          $.each((data||'').split(/\n/g),function(_,line){
            var cols=line.split(/,/);
            var x = +(cols[2]);
            var y = +(cols[3]);
            //console.assert(!isNaN(x), cols);
            var village = {
              id:+(cols[0]),
              name:decodeURIComponent(cols[1]).replace(/\+/g,' '),
              x:x,
              y:y,
              ownerID:+(cols[4]),
              points:+(cols[5]),
              bonus_id:+(cols[6]),
              //continent:(Math.floor(y/100)*10)+Math.floor(x/100),
            };
            villages.push(village);
          });
          console.timeEnd("Parsing");
          resolve(villages);
        },
      });
  });
}

function loadPlayers(url, extData) {
  var res = new Promise(function (resolve, reject) {
      $.ajax( {
        'url': (url || window.location.origin + '/map/player.txt'),
        'async':true,
        'dataType':'text',
        'type':'GET',
        'error':function(req,status,err){reject(status);},
        'success':function(data,status,req){
            // TODO: avoid blocking call - cut in many steps
            console.time("Parsing");
          var players = [];
          $.each((data||'').split(/\n/g),function(_,line){
            var cols=line.split(/,/);
            var name=decodeURIComponent(cols[1]).replace(/\+/g,' ');
            //console.assert(!isNaN(x), cols);
            var player={
                id:+(cols[0]),
                name:name,
                tribeID:+(cols[2]),
                villages:+(cols[3]),
                points:+(cols[4]),
                rank:+(cols[5]),
            };
            players.push(player);
          });
          console.timeEnd("Parsing");
          resolve(players);
        },
      });
  });
  return res;
}


if(!Promise.prototype.done) {
    Promise.prototype.done = function(onFulfilled, onRejected) {
        this
            .then(onFulfilled, onRejected)
            .catch(function(e) {
                setTimeout(function() { throw e; });
            })
        ;
    };
}
// http://aaronpowell.github.io/db.js/
if(!window.db) {
  !function(e,n){"use strict";var t,r=e.IDBKeyRange||e.webkitIDBKeyRange,o={readonly:"readonly",readwrite:"readwrite"},i=Object.prototype.hasOwnProperty,u=function(){if(!t&&(t=e.indexedDB||e.webkitIndexedDB||e.mozIndexedDB||e.oIndexedDB||e.msIndexedDB,!t))throw"IndexedDB required";return t},c=function(e){return e},a=function(e,n){var t=this,r=!1;this.add=function(n){if(r)throw"Database has been closed";for(var i=[],u=0,c=0;c<arguments.length-1;c++)if(Array.isArray(arguments[c+1]))for(var a=0;a<arguments[c+1].length;a++)i[u]=arguments[c+1][a],u++;else i[u]=arguments[c+1],u++;var s=e.transaction(n,o.readwrite),f=s.objectStore(n);return new Promise(function(e,n){i.forEach(function(e){var n;if(e.item&&e.key){var t=e.key;e=e.item,n=f.add(e,t)}else n=f.add(e);n.onsuccess=function(n){var t=n.target,r=t.source.keyPath;null===r&&(r="__id__"),Object.defineProperty(e,r,{value:t.result,enumerable:!0})}}),s.oncomplete=function(){e(i,t)},s.onerror=function(e){n(e)},s.onabort=function(e){n(e)}})},this.update=function(n){if(r)throw"Database has been closed";for(var i=[],u=0;u<arguments.length-1;u++)i[u]=arguments[u+1];{var c=e.transaction(n,o.readwrite),a=c.objectStore(n);a.keyPath}return new Promise(function(e,n){i.forEach(function(e){var n;if(e.item&&e.key){var t=e.key;e=e.item,n=a.put(e,t)}else n=a.put(e);n.onsuccess=function(){}}),c.oncomplete=function(){e(i,t)},c.onerror=function(e){n(e)},c.onabort=function(e){n(e)}})},this.remove=function(n,t){if(r)throw"Database has been closed";var i=e.transaction(n,o.readwrite),u=i.objectStore(n);return new Promise(function(e,n){u["delete"](t);i.oncomplete=function(){e(t)},i.onerror=function(e){n(e)}})},this.clear=function(n){if(r)throw"Database has been closed";{var t=e.transaction(n,o.readwrite),i=t.objectStore(n);i.clear()}return new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(e){n(e)}})},this.close=function(){if(r)throw"Database has been closed";e.close(),r=!0,delete d[n]},this.get=function(n,t){if(r)throw"Database has been closed";var o=e.transaction(n),i=o.objectStore(n),u=i.get(t);return new Promise(function(e,n){u.onsuccess=function(n){e(n.target.result)},o.onerror=function(e){n(e)}})},this.query=function(n,t){if(r)throw"Database has been closed";return new s(n,e,t)};for(var u=0,c=e.objectStoreNames.length;c>u;u++)!function(e){t[e]={};for(var n in t)i.call(t,n)&&"close"!==n&&(t[e][n]=function(n){return function(){var r=[e].concat([].slice.call(arguments,0));return t[n].apply(t,r)}}(n))}(e.objectStoreNames[u])},s=function(e,t,i){var u=this,a=!1,s=function(u,c,s,f,l,d,m){var h=t.transaction(e,a?o.readwrite:o.readonly),p=h.objectStore(e),v=i?p.index(i):p,y=u?r[u].apply(null,c):null,b=[],g=[y],l=l?l:null,d=d?d:[],w=0;"count"!==s&&g.push(f||"next");var x=a?Object.keys(a):!1,k=function(e){for(var n=0;n<x.length;n++){var t=x[n],r=a[t];r instanceof Function&&(r=r(e)),e[t]=r}return e};return v[s].apply(v,g).onsuccess=function(e){var t=e.target.result;if("number"==typeof t)b=t;else if(t)if(null!==l&&l[0]>w)w=l[0],t.advance(l[0]);else if(null!==l&&w>=l[0]+l[1]);else{var r=!0,o="value"in t?t.value:t.key;d.forEach(function(e){e&&e.length&&(r=2===e.length?r&&o[e[0]]===e[1]:r&&e[0].apply(n,[o]))}),r&&(w++,b.push(m(o)),a&&(o=k(o),t.update(o))),t["continue"]()}},new Promise(function(e,n){h.oncomplete=function(){e(b)},h.onerror=function(e){n(e)},h.onabort=function(e){n(e)}})},f=function(e,n){var t="next",r="openCursor",o=[],i=null,u=c,f=!1,l=function(){return s(e,n,r,f?t+"unique":t,i,o,u)},d=function(){return i=Array.prototype.slice.call(arguments,0,2),1==i.length&&i.unshift(0),{execute:l}},m=function(){return t=null,r="count",{execute:l}},h=function(){return r="openKeyCursor",{desc:v,execute:l,filter:p,distinct:y,map:g}},p=function(){return o.push(Array.prototype.slice.call(arguments,0,2)),{keys:h,execute:l,filter:p,desc:v,distinct:y,modify:b,limit:d,map:g}},v=function(){return t="prev",{keys:h,execute:l,filter:p,distinct:y,modify:b,map:g}},y=function(){return f=!0,{keys:h,count:m,execute:l,filter:p,desc:v,modify:b,map:g}},b=function(e){return a=e,{execute:l}},g=function(e){return u=e,{execute:l,count:m,keys:h,filter:p,desc:v,distinct:y,modify:b,limit:d,map:g}};return{execute:l,count:m,keys:h,filter:p,desc:v,distinct:y,modify:b,limit:d,map:g}};"only bound upperBound lowerBound".split(" ").forEach(function(e){u[e]=function(){return new f(e,arguments)}}),this.filter=function(){var e=new f(null,null);return e.filter.apply(e,arguments)},this.all=function(){return this.filter()}},f=function(e,n,t){"function"==typeof n&&(n=n());for(var r in n){var o,u=n[r];o=!i.call(n,r)||t.objectStoreNames.contains(r)?e.currentTarget.transaction.objectStore(r):t.createObjectStore(r,u.key);for(var c in u.indexes){var a=u.indexes[c];try{o.index(c)}catch(e){o.createIndex(c,a.key||c,Object.keys(a).length?a:{unique:!1})}}}},l=function(e,n){var t=e.target.result,r=new a(t,n);return d[n]=t,Promise.resolve(r)},d={},m={version:"0.9.2",open:function(e){var n;return new Promise(function(t,r){d[e.server]?l({target:{result:d[e.server]}},e.server,e.version,e.schema).then(t,r):(n=u().open(e.server,e.version),n.onsuccess=function(n){l(n,e.server,e.version,e.schema).then(t,r)},n.onupgradeneeded=function(n){f(n,e.schema,n.target.result)},n.onerror=function(e){r(e)})})}};"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):e.db=m}(window);
}

/** http://forum.die-staemme.de/showthread.php?183996-Weltdaten-und-Configs
 *  http://forum.die-staemme.de/showthread.php?71112-Weltdaten-und-Interface
 *
 */
function MapDB(conf) {
  conf = conf || {};
  this.DB_NAME = conf.DB_NAME || "TWMapDB";
  // this.db = undefined;
  // new this.db('test', new Server('TWMapDB', 27017));
this.db.open();
  //db.close();
  //a = window.indexedDB.deleteDatabase(DB_NAME);
}


MapDB.prototype={
  VILLAGE_BONUS_ID: {
    NONE: 0,
    WOOD: 1,
    CLAY: 2,
    STONE: 2,
    IRON: 3,
    POPULATION: 4,
    FARM: 4,
    BARRACKS: 5,
    STABLE: 6, 
    GARAGE: 7, 
    RESSOURCE: 8,
    STORAGE: 8,
    MARKET: 9, 
    MERCHANT:9,
  },
  
  // TODO:(optional) new thread for data loading: var myWorker = new Worker("data:text/javascript;charset=US-ASCII,console.log('foo');");
    
  openDB:function openDB() {
    if (this.db) {
      return this.db;
    }
    
    var _this = this;

    this._tables = ['villages', 'players'];
    return db.open( {
        server: this.DB_NAME,
        version: 7,          // DON'T FORGET VERSION INCREASE
        schema: {
            villages: {
                key: { keyPath: 'id'  }, //, autoIncrement: true
                // Optionally add indexes
                indexes: {
                    //coord: { unique: true },
                    ownerID: { key : 'ownerID', unique: false },
                    x_y: { key : ['x','y'], unique: true },
                }
            },
            players: {
                key: { keyPath: 'id'  }, //, autoIncrement: true
                indexes: {
                    //coord: { unique: true },
                    tribeID: { key : 'tribeID', unique: false },
                    name: { key : name, unique: true },
                }
            },
            metadata : {
              key: { keyPath: 'name'  },
            },
        }
    } ).then(function(server) {
        _this.db = server;
        return server;
        });
  },
  _setMeta:function(name, value) {
      console.log("_setMeta - his.db.metadata.update({name:name, value:value}) : " . this.db.metadata.update({name:name, value:value}));
    return this.db.metadata
      .update({name:name, value:value});
  },
  _getMeta : function (name) {
    return this.db.metadata.get(name)
    .then(function (record) {
      return Promise.resolve(record && record.value);
    });
  },
  _delMeta : function (name) {
    console.log("_delMeta - this.db.metadata.remove(name) : " . this.db.metadata.remove(name));
    return this.db.metadata.remove(name);
  },
  deleteDatabase: function() {
    if (this.db) this.db.close();
    var _this = this;
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.deleteDatabase(_this.DB_NAME);
        request.onsuccess = function(event) {
          console.log("delete success");
          _this.db = null;
          resolve(true);
        };
        request.onerror = function(event) {
          console.log("delete error");
          reject(event);
        };
    });
  },
  isEmpty:function() {
    var _this = this;
    return Promise.all(this._tables.map(function(tableName) {
      return _this.db[tableName].query().all().limit(1).execute().then(function(result) {
        return result.length>0;
      });
    })).then(function(notEmptyFlags) {
      return notEmptyFlags.indexOf(true)==-1;
    });
  },
  /**
   */
  _isXUptodate: function(lastUpdateKey, maxAge) {
    return this._getMeta(lastUpdateKey)
    .then(function (lastUpdate) {
      if (!lastUpdate || (+lastUpdate + (maxAge * 60000) < (new Date().getTime()))) {
        return false;
      }
      return lastUpdate;
    })
  },
  isUptoDate:function() {
    return Promise.all([this._isXUptodate('villageUpdateDate', 24 * 60), this._isXUptodate('playerUpdateDate', 24 * 60)])
       .then(function(resultList) {
         return resultList.indexOf(false)==-1;
         });
  },
  refresh: function() {
    return Promise.all([this.refreshPlayers(), this.refreshVillages()]);
  },
  /*
   *       VILLAGES
   * 
   */
  refreshVillages: function(maxAge, url) {
    var _this = this; 
    
    if (!maxAge) {
      maxAge = 24 * 60;
    }
    if (maxAge < 60) {
      maxAge = 60;
    }
    
    function doLoad() {
      var villages;
      return loadVillages(url)
      .then(function (avillages) {
        villages = avillages;
        return _this._delMeta('villageUpdateDate');
      })
      .then(function() {
        return _this.db.villages.clear();
      })
      .then(function () {
        return _this.fillVillages(villages);
      });
    }
    return this._isXUptodate('villageUpdateDate', maxAge)
    .then(function (isXUptodate) {
      if (isXUptodate == false) {
        return doLoad();
      }
      return isXUptodate; // already up to date
    });
  },
  fillVillages : function (villages) {
    if(!Array.isArray(villages)) {
      var unpack=[];
      for(var k in villages) {
        if(villages.hasOwnProperty(k)) unpack.push(villages[k]);
      }
      villages = unpack;
    }
    //return this.db.villages.add(villages);
    var _this = this;
    var CNT = 10000;
    if (villages.length<=CNT) {
      return this.db.villages.add(villages)
          .then(function() {
            return _this._setMeta('villageUpdateDate', (new Date().getTime())).then(function(){return villages;});
          });
    }
    var begin = 0;
    var end = 0;
    return new Promise(function (resolve, reject) {
      function next() {
        //console.log("Progress:"+begin+'/'+villages.length);
        //console.time("Next "+CNT);
        if(begin>=villages.length) {
          _this._setMeta('villageUpdateDate', (new Date().getTime()))
            .then(function() {
              resolve(villages);
            });
          return;
        }
        begin = end;
        end = begin + CNT;
        _this.db.villages.add(villages.slice(begin, end)).then(function() {
          //console.timeEnd("Next "+CNT);
          //setTimeout(next, 1000);
          next();
        }).catch(reject);
      }
      next();
    });
  },
  villagesByPlayerId : function villagesByPlayerId(id, idxField) {
    res = this.db.villages.query("ownerID")
       .only(+id)
       .execute();
    if(idxField) {
      res = res.then(function(villages) {
          var map = {};
          var key = idxField==='coord'?function(val){return val.x+'|'+val.y;}:function(val){return val[idxField];};
          for(var i=0;i<villages.length;i++) {
            var val=villages[i];
            map[key(val)] = val;
          }
          return map;
      });
    }
    return res;
  },
  villageByCoord : function (x, y) {
    return this.db.villages.query('x_y').only([+x, +y]).execute().then(function (villages) {
      if (villages.length>1) {
        return Promise.reject("More than one village on one coordinate");
      }
      if (villages.length==0) {
        return Promise.resolve(undefined);
      }
      return Promise.resolve(villages[0]);
    }); //.done(console.log)
  },
  villageByCoordRext : function (xTopLeft,yTopLeft,xBottomRight,yBottomRight) {
    return this.db.villages.query('x_y').bound(
     [xTopLeft, yTopLeft],
     [xBottomRight, yBottomRight])
     .filter(function(village) {
       return xTopLeft<=village.x && village.x <= xBottomRight && yTopLeft<=village.y && village.y <= yBottomRight;
     })
     .execute();
  },
  /**
   * 
   * @param {number} ownerId - Optional owner of the villages
   */
  villageByDistanceFrom : function (x, y, dist, ownerId) {
    var idist = Math.floor(dist);
    var squaredist = dist * dist;
    var xTopLeft = x-idist,yTopLeft= y-idist,xBottomRight = x+idist,yBottomRight = y+idist;
    var res = this.db.villages.query('x_y').bound(
     [xTopLeft, yTopLeft],
     [xBottomRight, yBottomRight])
     .filter(function(village) {
       var dx = village.x - x;
       var dy = village.y - y;
       var d2 = dx*dx + dy*dy;
       return d2<=squaredist;
     });
    if (ownerId!==undefined) {
      res = res.filter(function(village) {
        return village.ownerID===ownerId;
      });
    }
    return res.execute();
  },
  /*
   *       PLAYERS
   * 
   */
  refreshPlayers: function(maxAge, url) {
    var _this = this; 
    
    if (!maxAge) {
      maxAge = 24 * 60;
    }
    if (maxAge < 60) {
      maxAge = 60;
    }
    
    function doLoad() {
      var players;
      return loadPlayers(url)
      .then(function (aplayers) {
        players = aplayers;
        return _this._delMeta('playerUpdateDate');
      })
      .then(function() {
        return _this.db.players.clear();
      })
      .then(function () {
        return _this.fillPlayers(players);
      });
    }
    return this._isXUptodate('playerUpdateDate', maxAge)
    .then(function (isUpTodate) {
      if (isUpTodate == false) {
        return doLoad();
      }
      return isUpTodate;
    });
  },
  fillPlayers : function (players) {
    var _this = this; 
    return this.db.players.add(players)
          .then(function() {
            return _this._setMeta('playerUpdateDate', (new Date().getTime())).then(function(){return players;});
          });
  },
  playersByTribeId : function (tribeId) {
    return this.db.players.query("tribeID").only(tribeId).execute();
  },
  
  
  // tribeById = function(id) 
  
  
  /**
   */
  info: function() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var info={};
      var numQueries = 4;
      function onDone() {
        numQueries --;
        if(numQueries==0) {
          resolve(info);
        }
      }
      var onFail = reject;
      
      _this._getMeta('villageUpdateDate').then(function(uD) {
        info.villageUpdateDate = uD;
        onDone();
      }).catch(onFail);
      _this._getMeta('playerUpdateDate').then(function(uD) {
        info.playerUpdateDate = uD;
        onDone();
      }).catch(onFail);
      _this.db.villages.count().then(function(cnt) {
        info.villagesCnt = cnt;
        onDone();
      }).catch(onFail);
      _this.db.players.count().then(function(cnt) {
        info.playersCnt = cnt;
        onDone();
      }).catch(onFail);
    });
  },
};



/*  END TWMap*/
 

function loadDependencies(dependencyList, callback) {
  var i=0;
  function doIt() {
    if (i>=dependencyList.length) {
      callback();
      return;
    }
    var url = dependencyList[i];
    i++;
    $.ajax({
      url: url,
      cache: true,
      dataType: "script",
      success: doIt,
    });
  }
  doIt();
}

/*****************************************************************************************
 *
 *                         TWScript module AmFarm class
 *
 ****************************************************************************************/

TWScript = typeof TWScript == 'undefined' ? {}: TWScript;
 

TWScript.AmFarm = function AmFarm() {
  if (game_data.screen !== 'am_farm') {
    throw new Error("Wrong screen: should be am_farm, but is " + game_data.screen);
  }
  //Accountmanager.farm.current_units

  var rows = $("table#plunder_list > tbody > tr[id*='village']");

  function cacher(fn) {
    var cache;
    return function () {
      if (typeof cache === 'undefined') {
        cache = fn();
      }
      return cache;
    }
  }

  var Row = this.Row;
  this.rows = rows.map(function () {
      return new Row($(this));
    });

  this.getAvailable = function () {
    var available = {};
    $("#units_home .unit-item").each(function () {
      available[this.id] = parseInt($(this).text(), 10);
    });
    return available;
  }

  try {
    this.current_units = Accountmanager.farm.current_units;
  } catch (e) {}
}
TWScript.AmFarm.prototype.Row = function Row(tr) {
  var ressourcesTd = $("span.wood", tr).closest('td');
  if (ressourcesTd.length == 0) {
    ressourcesTd = $("td", tr).filter(function () {
        return $(this).text().trim() == '?';
      }).first();
  }
  
  this._tr = tr;
  this._ressourcesTd = ressourcesTd;

  this.reportLink = $("a[href*='screen=report']", tr)[0];

  var res = ressourcesTd.text().trim().replace(/[^0-9 ]/g, '').split(/ +/);
  
  this.wood = parseInt(res[0], 10);
  this.stone = parseInt(res[1], 10);
  this.iron = parseInt(res[2], 10);

  var wallTd = ressourcesTd.next();
  var distanceTd = wallTd.next();

  this.wallLevel = parseInt(wallTd.text());
  this.distance = parseFloat(distanceTd.text());

  this.placeLink = $("a[href*='screen=place']", tr)[0];
}

TWScript.AmFarm.prototype.isUnitSelected = function (u) {
  var el = $("#farm_units input[name='" + u + "']");
  return el.prop('checked');
};

/**
 * Returns a jQuery object containing strings
 */
TWScript.AmFarm.prototype.selectedUnits = function () {
  return $("#farm_units input[type='checkbox']").filter(function () {
    return $(this).prop('checked');
  }).map(function () {
    return $(this).prop('name');
  });
};

/**
 * Return the troop Model with the given letter
 * @param  {string}   Letter identifying the model
 * @return {object}   Map of unit => count
 */
TWScript.AmFarm.prototype.getModel = function (letter) {
  var res = {};
  var form = $("form a.farm_icon_" + (letter.toLowerCase())).closest('form');
  $.each(form.serializeArray().filter(function (a) {
      return a.value > 0;
    }), function (_, o) {
    res[o.name] = o.value;
  });
  var template_id = (/template_id=([0-9]*)[^0-9]/.exec(form.prop('action')))[1];
  // use defineProperty to make it non enumerable
  Object.defineProperty(res,'template_id',{value:template_id});
  res.__proto__ = TWScript.AmFarm.ModelClass;
  return res;
};

TWScript.AmFarm.prototype.getPureSpyModelLetter = function () {
  if (this.getModel('a').isPureSpy()) return 'a';
  if (this.getModel('b').isPureSpy()) return 'b';
  return undefined;
};

TWScript.AmFarm.ModelClass = {
  isPureSpy:function() {
    return !!(Object.keys(this).length == 1 && this.spy);
  },
};
 
/**********************************************************************************
 *     Scout script
 * 
 * javascript: if(window.barbarianScouter) { window.barbarianScouter.run(); } else { $.getScript(' ___________ '); } void(0);
 */

(function() {
  
  if (game_data.screen != 'am_farm') {
    UI.ErrorMessage("Le script doit �tre lanc� depuis l'assistant de pillage");
    return;
  }
  if (location.href.indexOf('dir=desc')>0||(location.href.indexOf('order=')>0 && location.href.indexOf('order=dist')==-1)) {
    UI.ErrorMessage("Triez les rapports par ordre de distance croissante!");
    return;
  }
  
  
  function DistSorter(x, y) {
    return function (xyA, xyB) {
      var dxA = xyA.x - x,
      dyA = xyA.y - y;
      var dxB = xyB.x - x,
      dyB = xyB.y - y;
      var dA = dxA * dxA + dyA * dyA;
      var dB = dxB * dxB + dyB * dyB;
      return dA - dB;
    };
  }

  function handleError(e) {
    UI.ErrorMessage("Une erreur s'est produite " + e);
    var el = $('<div/>', {
        class : 'info_box',
        id : 'barbarian_spy',
      }).insertAfter("#script_warning");
    el.text(e+"\n"+e.stack);
  }

  function selectedPageId() {
    return +$("#plunder_list_nav strong.paged-nav-item").text().replace(/[^1-9]/g,'');
  }

  function lastPageId() {
    return +$("#plunder_list_nav .paged-nav-item").last().text().replace(/[^1-9]/g,'');
  }

  function isLastPage() {
    return selectedPageId() == lastPageId();
  }
  
  function checkboxChecker(checkbox, required, message) {
    if (checkbox.prop('checked') != required) {
      var par = checkbox.parent();
      UI.ErrorMessage(s(message, par.text().trim()));
      par.css('color','red');
      return false;
    }
    return true;
  }
  
  //
  // Don't redefine barbarianScouter if present, as the state should be kept until page exit
  //
  if (!window.barbarianScouter) {
    
    var scoutButtonDone = JSON.parse(sessionStorage.getItem('scoutButtonDone')) || {};
    /**
     * ScoutButtonDone class register every scouted village in sessionStorage,
     *  in order to avoid sending another spy from another village.
     */
    var ScoutButtonDone = {
      setDone : function (id) {
        scoutButtonDone[id] = true;
      },
      isDone : function (id) {
        return scoutButtonDone.hasOwnProperty(id) && scoutButtonDone[id];
      },
      flush : function () {
        sessionStorage.setItem('scoutButtonDone', JSON.stringify(scoutButtonDone));
      },
      _init : (function () {
        var flushCallback = function() { ScoutButtonDone.flush(); };
        $(window).on('unload', flushCallback);
      }
        ()),
    };
    
    window.barbarianScouter = {
      /**
       * Start method.
       *  Performs last checks and configures the algorithm
       */
      run: function run() {
        var DIST_MAX = 50;
        
        this.amfarm = new TWScript.AmFarm();
        this.spyModelLetter = this.amfarm.getPureSpyModelLetter();
        if (!this.spyModelLetter) {
          UI.ErrorMessage("Aucun modele avec seulement des eclaireurs disponible");
          return;
        }

        this.model = this.amfarm.getModel(this.spyModelLetter);
        var rows = this.rows = this.amfarm.rows;
        this.maxDistance = isLastPage() ? DIST_MAX : Math.min(DIST_MAX, rows[rows.length - 1].distance);
        var isFirstPage = selectedPageId()==1;
        this.minDist = isFirstPage ? 1 : rows[0].distance;
        if (this.minDist>=DIST_MAX) {
          UI.ErrorMessage("Le rescout ne marche pas � plus de "+DIST_MAX+" cases de distance. Centrez vous sur un autre village");
          return;
        }

        this.twMap = new MapDB();
        
        this.warnIfStrangeCheckBoxesAndAskForRefreshPermission();
      },
      /**
       * Performs some optional checks (warnings).
       * Refreshes the database if needed (asks permission).
       * 
       * When done, calls next step (searchMissingWithFreshDatabase()).
       * 
       * Asynchronous function.
       */
      warnIfStrangeCheckBoxesAndAskForRefreshPermission: function warnIfStrangeCheckBoxesAndAskForRefreshPermission() {
        var _this = this;
        function refreshThenStart() {
          UI.InfoMessage("Actualisation de la carte, ceci peut durer une minute...", 5000);
          _this.twMap.refresh().then(function() {
            UI.InfoMessage("Carte actualisee");
            _this.searchMissingWithFreshDatabase();
            }).catch(handleError);
        }
        
        return new Promise(function(resolve, reject) {
          var ok = true;
          ok &= checkboxChecker($("#all_village_checkbox"), false, "Il est conseille de decocher '%1'");
          ok &= checkboxChecker($("#attacked_checkbox"), true, "Il est conseille de cocher '%1'");
          ok &= checkboxChecker($("#full_hauls_checkbox"), false, "Il est conseille de decocher '%1'");
          ok &= checkboxChecker($("#full_losses_checkbox"), true, "Il est conseille de cocher '%1'");
          ok &= checkboxChecker($("#partial_losses_checkbox"), true, "Il est conseille de cocher '%1'");
          if(ok) {
            resolve();
          } else {
            // Wait 2 seconds to avoid hiding the error message behind an upcomming InfoMessage
            setTimeout(resolve, 2000);
          }
        })
        .then(function() {
          return _this.twMap.openDB();
        })
        .then(function () {
          return Promise.all([_this.twMap.isUptoDate(), _this.twMap.isEmpty()])
          .then(function(resultList) {
            var uptodate = resultList[0], isEmpty = resultList[1];
            if (uptodate == false) {
              var message = isEmpty ? 
                   'Voulez-vous proceder au chargement initial de la carte du monde? \nCeci peut durer une minute et consommer plusieur dizaines de Mo sur votre disque dur.'
                 : 'Il est necessaire d\'actualiser la carte du monde. Ceci peut durer une minute. Continuer?'
              UI.ConfirmationBox(message, [{
                    text : 'Oui',
                    callback : refreshThenStart,
                    confirm : true
                  }
                ]);
              return;
            }
            UI.InfoMessage("La carte est à jour");
            _this.searchMissingWithFreshDatabase();
          });
        })
        .catch(handleError);
      },
      /**
       * Search barbarians around this village, filter by distance, sort by distance, than call doScout(villages)
       * 
       * Asynchronous function.
       */
      searchMissingWithFreshDatabase: function searchMissingWithFreshDatabase() {
        var _this = this;
        return _this.twMap.villageByDistanceFrom(+game_data.village.x, +game_data.village.y, this.maxDistance, 0)
        .then(function (villages) {
          console.log("villages found", villages.length);
          var minDist2 = _this.minDist * _this.minDist;
          villages = villages.filter(
              function (village) {
              var dx = village.x - game_data.village.x;
              var dy = village.y - game_data.village.y;
              var d2 = dx * dx + dy * dy;
              return d2 >= minDist2;
            });
          console.log("villages filtered", villages.length);
          return villages.sort(DistSorter(+game_data.village.x, +game_data.village.y));
        })
        .then(function (villages) {
          console.log("villages sorted", villages.length);
          _this.doScout(villages);
          console.log("done");
          UI.SuccessMessage("Termin�");
        })
        .catch (handleError);
      },
      /**
       * Find missing barbarians and updates user interface.
       * 
       * @param {array} barbVillages - List of barbarians in range, sorted in ascending order.
       */
      doScout: function doScout(barbVillages) {
        var _this = this;
        var template_id = _this.model.template_id;
        var el = $("#barbarian_spy");
        if (el.length != 0) {
          el.remove();
        }
        el = $('<div/>', {
            class : 'info_box',
            id : 'barbarian_spy',
          }).insertAfter("#script_warning");
        
        
        function scoutAround(x, y, parentEl, template_id) {
          console.log('scoutAround', x, y, parentEl, template_id);
          // /game.php?village=154183&mode=farm&action=edit&h=5de0&template_id=3027&screen=am_farm
          //return Accountmanager.farm.sendUnits(A_Link, village_id, template_id)
          console.log('barbVillages=',barbVillages);
          for (var i = 0; i < barbVillages.length; i++) {
            var village = barbVillages[i];
            var vId = village.id;
            if (ScoutButtonDone.isDone(vId)) {
              continue;
            }
            
            if ($('.farm_village_' + vId).length == 0) {
              
              var vdst = Math.round(Math.sqrt(Math.pow(village.x - x, 2) + Math.pow(village.y - y, 2)) * 10) / 10;
              var info = village.x + "|" + village.y + " D:" + vdst;
              var lnk = $("<a>", {
                  class : 'farm_village_' + vId + ' farm_icon farm_icon_' + _this.spyModelLetter.toLowerCase(),
                  onclick : "return Accountmanager.farm.sendUnits(this, " + vId + ", " + template_id + ")",
                  href : '#',
                  title : info,
                });
              var div = $('<div>', {
                id: "rescout_div_" + vId,
                style : 'display:inline-block; 	border: 2px solid;',
              }).append($("<a>", {
                  href : s("%1info_village&id=%2", game_data.link_base_pure, vId),
                  text : info,
                }), lnk).appendTo(parentEl);
              lnk.on('click', (function (id) {
                return function() {
                  //console.log(id, div);
                  $("#rescout_div_" + id).remove();
                  ScoutButtonDone.setDone(id);
                  //console.log("fkjkkfhjjk");
                };}(vId)));
            } else {
              ScoutButtonDone.setDone(vId);
            }
          }
          //<a class="farm_village_152035 farm_icon farm_icon_a" onclick="return Accountmanager.farm.sendUnits(this, 152035, 3027)" href="#"></a>
        }
        
        // $("#script_warning")
        
        scoutAround(+game_data.village.x, +game_data.village.y, el, template_id);
        
        if (el.text().trim() == '') {
          el.text("Tout les villages ont �t� trouv�s dans l'AP");
        }
        
        ScoutButtonDone.flush();
      },
    };
  }  // END: window.barbarianScouter definition
  
  window.barbarianScouter.run();
}());