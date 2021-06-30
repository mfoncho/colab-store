import { all, fork } from "redux-saga/effects";

const watch = ({ effect, type, handler }: any) =>
    function* watcher() {
        yield effect(type, handler);
    };

const watchers = [
    ...require("./init").tasks,
    ...require("./app").tasks,
    ...require("./label").tasks,
    ...require("./role").tasks,
    ...require("./ping").tasks,
    ...require("./tool").tasks,
    ...require("./auth").tasks,
    ...require("./user").tasks,
    ...require("./task").tasks,
    ...require("./card").tasks,
    ...require("./board").tasks,
    ...require("./thread").tasks,
    ...require("./status").tasks,
    ...require("./dialog").tasks,
    ...require("./router").tasks,
    ...require("./column").tasks,
    ...require("./space").tasks,
    ...require("./member").tasks,
    ...require("./message").tasks,
    ...require("./checklist").tasks,
    ...require("./workspace").tasks,
    ...require("./permissions").tasks,
    ...require("./notification").tasks,
    ...require("./subscription").tasks,
    ...require("./conversation").tasks,
].map(watch);

const sagas = [...watchers].map(fork);

function* main() {
    yield all(sagas);
}

export default main;
