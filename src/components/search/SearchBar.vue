<template>
  <div id="searchBarAndText" class="searchBarAndTextBox">
    <div id="searchText" class="searchTextBox">
      <div id="searchTextText" class="searchTextTextBox">
        &nbsp;寻找游戏或聊天！
      </div>
    </div>
    <div id="searchPart" class="searchPartBox">
      <div id="searchBar" class="searchBarBox">
        <input type="text" class="searchInputBox" @focus="inputBoxOn" @blur="inputBoxOut">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "SearchBar",
  methods: {
    inputBoxOn: () => {
      let inputBox = document.getElementById('searchBar')
      if (inputBox !== null) {
        inputBox.style.boxShadow = 'inset 20px 20px 60px #27426b,inset -20px -20px 60px #355a91'
      }
    },
    inputBoxOut: () => {
      let inputBox = document.getElementById('searchBar')
      if (inputBox !== null) {
        inputBox.style.boxShadow = ''
      }
    }
  }
}
</script>

<style scoped>
.searchBarAndTextBox {

  --searchBarBoxWidth: 800px;
  --searchBarBoxHeight: 60px;

  --searchBarBoxTop: calc(var(--searchTextBoxTop) + 80px);
  --searchTextBoxTop: 60px;

  --inputOffsite: 20px;
}

.searchPartBox {
  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center
}
.searchBarBox {
  width: var(--searchBarBoxWidth);
  height: var(--searchBarBoxHeight);

  position: relative;
  top: var(--searchBarBoxTop);

  display: grid;
  align-items: center;

  border-radius: var(--searchBarBoxHeight) var(--searchBarBoxHeight);

  background-color: var(--search-bar);
}
.searchTextBox {
  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center
}
.searchTextTextBox {
  position: relative;
  height: calc(100% - var(--searchTextBoxTop));

  top: var(--searchTextBoxTop);

  font-size: 40px;
  font-family: “Arial”,”Microsoft YaHei”,”黑体”,”宋体”,sans-serif;
  letter-spacing: 4px;

  color: var(--white);
}
.searchInputBox {
  position: absolute;
  left: var(--inputOffsite);

  width: calc(var(--searchBarBoxWidth) - var(--inputOffsite));
  height: calc(var(--searchBarBoxHeight) - 2px);

  border: 0;
  outline:none;

  border-radius: var(--searchBarBoxHeight) var(--searchBarBoxHeight);


  font-size: 25px;

  color: var(--white);

  /*color: transparent;*/
  /*text-shadow: 0 0 0 #000;*/

  /*background-color: pink;*/
  background-color: #00000000;


  z-index: calc(var(--top-layer) - 4);
}

</style>