// storage/saveEntities.js

export function saveEntitiesToStorage(entities) {
    localStorage.setItem("entities", JSON.stringify(entities));
}