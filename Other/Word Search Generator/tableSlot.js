class TableSlot {
    content; isLocked;
    constructor(content = " ", isLocked = false) {
        this.content = content;
        this.isLocked = isLocked;
    }
    toString() {
        return this.content.toString();
    }
}