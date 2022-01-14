//Created Character Classes using Interface and designing a randomized attack system using TypeScript

interface CharacterInterface {
    name: string;
    health: number;
    maxHealth: number,
    attack: number;
    defense: number;
    accuracy: number;
    healthBar: HealthIcon[];
    attackTarget(target: CharacterInterface): void;
    showHealth: () => void;
}

type HealthIcon = "🟩" | "🟥";
class Character implements CharacterInterface {
    healthBar: HealthIcon[] = [
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
        "🟩",
    ];

    maxHealth: number = this.health;
    constructor(
        public name: string,
        public health: number,
        public attack: number,
        public defense: number,
        public accuracy: number
    ) { }

    attackTarget(target: CharacterInterface) {
        //Check Attacker Health
        if (this.health <= 0) {
            return;
        } else {
            //Check Target Health
            if (target.health > 0) {
                //Attack Landed
                if (Math.random() > 1 - this.accuracy) {
                    let damage: number = 
                    this.attack * (100 / 100 + target.defense) + Math.floor(Math.random() * 5);
                    console.log(
                        `${this.name} is attacking ${target.name} with ${damage} damage!💥 \n`
                        );
                    target.health -= damage;

                    // Checking Targets Health Percent
                    let targetHealthPercent = (target.health / target.maxHealth).toFixed(2);
                    if (targetHealthPercent.toString()[0] === "-") {
                        for (let x = 0; x < target.healthBar.length; x++) {
                            target.healthBar[x] = "🟥";
                        }
                    } else {
                        target.healthBar = [
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                            "🟥",
                        ];
                        for (let y = 0; y < +targetHealthPercent.toString()[2]; y++) {
                            target.healthBar[y] = '🟩';
                        }
                        target.showHealth();
                    }
                    //Check if target is still alive
                    if (target.health <= 0) {
                        console.log(`${target.name} was defeated by ${this.name} ... 💀\n`)
                    }
                } else {
                    console.log(`${this.name}'s Attack Missed! \n`)
                }
            }
        }
    }

    async rest() {
        console.log("Resting");
        return new Promise((resolve, reject): void => {
            setTimeout(() => {
                console.log("Rest Complete. HP Restored");
                this.health = this.maxHealth;
                resolve("");
            }, 3000);
        });
    }

    showHealth() {
        console.log(`[${this.name}]`)
        console.log(`${this.healthBar.join('')}`)
        console.log(`HP: ${this.health}/ ${this.maxHealth} \n`);
    }
}

class Player extends Character {
    constructor(
        public name: string,
        public health: number,
        public attack: number,
        public defense: number,
        public accuracy: number
    ) {
        super(name, health, attack, defense, accuracy);
    }
}

class Enemy extends Character {
    constructor(
        public name: string,
        public health: number,
        public attack: number,
        public defense: number,
        public accuracy: number
    ) {
        super(name, health, attack, defense, accuracy);
    }
}

const Player1: Player = new Player('Dragon Slayer', 3130, 50, 30, 0.5);
const AI_Entry_Creature: Enemy = new Enemy("Fire-Rabbit", 500, 5, 7, 0.3)
const AI_Ice_Dragon_Boss: Enemy = new Enemy(
    "Ice Dragon",
    5050,
    25,
    18,
    0.4
)

const maxNumOfTurns = 100;
const engageCombat = (a: CharacterInterface, b: CharacterInterface) => {
    for (let i = 1; i < maxNumOfTurns; i++) {
        if (Math.random() > .5) {
            a.attackTarget(b)
        } else {
            b.attackTarget(a);
        }
    }
}
const ExecuteEvents = async () => {
    //Fight first creature
    engageCombat(Player1, AI_Entry_Creature);
    //break and restore healthBar
    await Player1.rest()
    //Fight Big Bad Boss
    engageCombat(Player1, AI_Ice_Dragon_Boss);
};

ExecuteEvents();