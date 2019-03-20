<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="width:100px;display:inline-block;">
        <h4>拖拽排序</h4>
      </div>
      <el-button v-waves type="primary" size="small" @click="startNewH">完成排序</el-button>
      <el-button v-waves type="primary" size="small" @click="sort">还原排序</el-button>
      <draggable
        class="list-group"
        tag="ul"
        :list="newsList"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" name="flip-list">
          <li class="list-group-item" v-for="element in newsList" :key="element.order">
            <div class="list-complete-item-handle">[ {{ element.author }} ] {{ element.title }}</div>
            <div style="position:absolute;right:0px;display:inline;margin-right:10px">
              <i style="color:#000000" class="el-icon-sort"/>
            </div>
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "newsSort",
  display: "Transitions",
  components: {
    draggable
  },
  data() {
    return {
      newsList: [
        {
          id: 1,
          title: "张阿斯顿发射点发大水",
          author: "admin1",
          order: 1
        },
        {
          id: 2,
          title: "qwe阿萨的情人",
          author: "admin2",
          order: 2
        },
        {
          id: 3,
          title: "青蛙似的十大高手",
          author: "admin3",
          order: 3
        },
        {
          id: 4,
          title: "案发当时现场v比较",
          author: "admin4",
          order: 4
        },
        {
          id: 5,
          title: "在v厨房和第三方",
          author: "admin5",
          order: 5
        }
      ],
      drag: false
    };
  },
  methods: {
    sort() {
      this.newsList = this.newsList.sort((a, b) => a.order - b.order);
    }
  },
  computed: {}
};
</script>

<style scoped>
ul {
  list-style: none;
  width: 100%;
  margin-left: -40px;
}

.list-group {
  margin-bottom: 20px;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
  display: inline;
}

.list-group-item.sortable-chosen {
  background: #48a2ff;
  color: #ffffff;
}

.ghost {
  opacity: 0.5;
  background: #48a2ff;
  color: #ffffff;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 2s;
}

.list-group-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 10px 16px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 200ms;
}

.list-group-item i {
  cursor: pointer;
}
</style>
