var state = {
    todos: [
        {
            id: 0,
            task: "Buy food at the supermarket.",
            completed: false
        },
        {
            id: 1,
            task: "Organize the living room.",
            completed: true
        },
        {
            id: 2,
            task: "Read every class and tutorial on Sabe.io.",
            completed: false
        }
    ]
};

var getters = {
    getTodos: state => state.todos
};

var mutations = {
    ADD_TODO: (state, payload) => {

        var newTask = {
            id: payload.newId,
            task: payload.task,
            completed: false
        }

        state.todos.unshift(newTask);
    },
    TOGGLE_TODO: (state, payload) => {
        var item = state.todos.find(todo => todo.id === payload);
        item.completed = !item.completed;
    },
    DELETE_TODO: (state, payload) => {
        var index = state.todos.findIndex(todo => todo.id === payload);
        state.todos.splice(index, 1);
    }
};

var actions = {
    addTodo: (context, payload) => {
        context.commit("ADD_TODO", payload)
    },
    toggleTodo: (context, payload) => {
        context.commit("TOGGLE_TODO", payload)
    },
    deleteTodo: (context, payload) => {
        context.commit("DELETE_TODO", payload)
    }
}

var store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});

Vue.component("todo-list", {
    computed: {
        todos() {
            return this.$store.getters.getTodos;
        }
    },
    methods: {
        toggleTodo: function (id) {
            this.$store.dispatch("toggleTodo", id);
        },
        deleteTodo: function (id) {
            this.$store.dispatch("deleteTodo", id);
        }
    },
    template: "#todo-list"
});

var app = new Vue({
    data: () => ({
        task: "",
        newId: 3
    }),
    methods: {
        addTodo: function () {
            this.$store.dispatch("addTodo", this);
            this.newId++;
            this.task = "";
        }
    },
    store: store,
    el: "#app",
    template: "#app-template"
});
