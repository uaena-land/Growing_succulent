export class Succulent {
    constructor({name, level, exp}) { //생성자
        this.name = name;
        this.level = level;
        this.exp = exp;
        this.maxExp = 10;
    }

    introduce() {
        return `안녕, 난 ${this.name} 이고 레벨은 ${this.level}이야.`;
    }

    sunny() {
        this.exp = this.exp + 2;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    watering() {
        this.exp = this.exp + 3;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    listening() {
        this.exp = this.exp + 5;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    updateState() {
        // if exp max <= exp
        if(this.maxExp <= this.exp) {
            this.levelUp();
        }
    }
    levelUp() {
        this.level = this.level + 1;
        console.log(`현재 레벨은 ${this.level} 입니다.`);
        this.exp = 0;
    }
}
