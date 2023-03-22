const random = ( min = 0, max = 1) => Math.floor(Math.random() * (max -min) + min)

console.log("random:", random(0,10))

class DNA{
    constructor(phrase){
        this.phrase = phrase
        this.genes = new Array(this.phrase.length).fill("")
        this.alphabet = "abcdefghijklmnopqrstuvqxyz "
        // this.alphabet = "beto "
        for (let i = 0; i < this.genes.length; i++) {
            // this.genes[i] = this.alphabet[Math.floor(Math.random() * (this.alphabet.length - 0) + 0]
            this.genes[i] = this.alphabet[random(0,this.alphabet.length)]
        }
        this.genes = this.genes.join("")
        this.fitness = -1
        // this.getFitness()
        this.generation = 1
    }

    getFitness(){
      let score = 0
      for(let i = 0; i < this.genes.length ;i++){
        // console.log("M: getfitness() i: ", i)
        // console.log("M: getfitness() genes[i]: ", this.genes[i])
        // console.log("M: getfitness() phrase.charAt(i): ", this.phrase.charAt(i))
        if(this.genes[i] == this.phrase.charAt(i)){
          score++
        }
        // console.log("M: getfitness() score: ", score)
      }
      this.fitness = +(score/this.phrase.length).toFixed(2)
      // console.log("fitness: ", this.fitness)
    }

    get(){
      return this
    }

    setGenes(index,value){
      let newArray = this.genes.split("")
      newArray[index] = value
      // console.log("new array: ", newArray)
      this.genes = newArray.join("")
    }

    crossover(partner){
      let child = new DNA(this.phrase)
      // console.log("M: (DNA) crossover: child: ", child)
      let midpoint = random(0,child.genes.length)
      // console.log("M: (DNA) crossover: midpoint: ", midpoint)
      for(let i = 0;i < child.genes.length; i++){
        console.log("M: (DNA) crossover: i: ", i)
        console.log("M: (DNA) crossover: this.phrase.charAt(i): ", this.phrase.charAt(i))
        console.log("M: (DNA) crossover: this.genes[i]: ", this.genes[i])
        console.log("M: (DNA) crossover: partner.genes[i]: ", partner.genes[i])
        if(this.genes[i] == this.phrase.charAt(i)){
          child.setGenes(i,this.genes[i])
          console.log("GOAL!", child.genes[i])
        }else if(partner.genes[i] == this.phrase.charAt(i)){
          child.setGenes(i,partner.genes[i])
          console.log("GOAL!", child.genes[i])
        }else{
          if(i > midpoint){
            child.setGenes(i,this.genes[i])
            if (Math.random() < 0.1) {
              child.setGenes(i,this.alphabet.charAt(random(0,this.alphabet.length)))
            }
            console.log("CHILD!", child.genes[i])
          }else{
            child.setGenes(i,partner.genes[i])
            if (Math.random() < 0.1) {
              child.setGenes(i,this.alphabet.charAt(random(0,this.alphabet.length)))
            }
            console.log("PARENT!", partner.genes[i])
          }
        }
      }
      // this.generation++
      child.generation = this.generation + 1
      child.getFitness()
      return child
    }

    getPhrase(){
      return this.genes
    }

    mutate(mutationRate=0.1, object){
      for (let i = 0; i < this.genes.length; i++) {
        if (Math.random() < mutationRate) {
          object.setGenes(i,this.alphabet.charAt(random(0,this.alphabet.length)))
        }
      }
      console.log("mutated object: ", object)
    }

}

class Pool{
  constructor(populationSize, goalDNA){
    this.population = new Array(10).fill("").map(item => new DNA(goalDNA))
    this.generation = 1
  }
  getPopulation(){
    return this.population
  }
  getMatingPool(){
    let matingPool = []
    for(let i = 0; i < this.population.length; i++){
      let n = this.population[i].fitness * 100
      if(n > 0){
        for (var j = 0; j < Math.round(n); j++) {
          matingPool.push(this.population[i])
        }
      }else{
        matingPool.push(this.population[random(0,this.population.length)])
        matingPool.push(this.population[random(0,this.population.length)])
      }
      // console.log("item fitness: ", n)
      // console.log("item fitness: ", Math.round(n))
    }
    this.matingPool = matingPool
    // console.log("mating pool: ", matingPool.map(e => e).genes)
    return matingPool
  }
  updateMatingPool(child){
    this.matingPool = [...this.matingPool,child]
  }
  removeNullParents(){
    this.population = [...this.matingPool.filter(member => member.fitness > 0)]
    this.matingPool = []
  }

  getFitness(){
    for(let i = 0; i < this.population.length; i++){
      this.population[i].getFitness()
    }
    console.log()
  }

  getParentOne(){
      this.parentOne = this.matingPool[random(0,this.matingPool.length)]
      // console.log("mating pool: ", this.matingPool)
      // console.log("parent one: ", this.parentOne)
  }
  getParentTwo(){
      this.parentTwo = this.matingPool[random(0,this.matingPool.length)]
      // console.log("mating pool: ", this.matingPool)
      // console.log("parent two: ", this.parentTwo)
  }
  getChild(){
      this.child = this.parentOne.crossover(this.parentTwo)
      // this.mutateChild()
      // console.log("child: ", this.child)
      this.population = [...this.population,this.child]
      // console.log("\n main population: ", this.population, "\n")
      // console.log("\n luxury population: ", this.population.slice(-10), "\n")
      this.generation++
      this.matingPool = []
      this.setTopFitness()
      if(this.topFitness == 1){
        this.bestPhrase = this.population.filter(item => item.fitness == 1)[0].phrase
      }else{
        this.bestPhrase = this.population.filter(e => e.fitness).slice(-1)[0]?.genes
      }
      return this.child
  }
  mutateChild(mutationRate=0.1){
      for (let i = 0; i < this.child.genes.length; i++) {
        if (random(0,10)/10 < mutationRate) {
          this.child.setGenes(i,this.child.alphabet.charAt(random(0,this.child.alphabet.length)))
          // this.child.genes[i] = this.child.alphabet.charAt(random(0,this.child.alphabet.length))
        }
      }
  }
  addChildToPool(){
    this.getFitness()
    // console.log("new child added: ", this.population)
  }
  setTopFitness(){
    this.topFitness = this.population.map(e => e.fitness).sort((a,b) => a - b).slice(-1)[0]
  }

  report(){
    // console.log("Best phrase: ", this.population.filter(e => e.fitness).slice(-1)[0].genes)
    console.log("Best phrase: ", this.bestPhrase)
    console.log("Total generations: ", this.generation)
    // console.log("Top fitness: ", this.population.map(e => e.fitness).sort((a,b) => a - b).slice(-1)[0])
    console.log("Top fitness: ", this.topFitness)
    console.log("Average fitness: ", (this.population.map(e => e.fitness).reduce((sum,cur) => sum + cur,0))/this.population.length)
    console.log("Total population: ", this.population.length)
    console.log("Mutation rate: ", 0.1)
  }

}

let population = new Pool(10,"to be or not to be")

// const evolution = () => {
let counter = 10000
let ttl = false
//
let occCount = 0

while(counter > 0 && population.topFitness != 1){
  population.getFitness()
  population.getMatingPool()
  population.getParentOne()
  population.getParentTwo()
  population.getChild()
  population.report()
  // console.log("population: ", population)
  // if(population.topFitness == 1){
  //   ttl = true
  //   occCount++
  // }

  counter--
}
console.log("occCount: ", occCount)

// population.removeNullParents()
// population.addChildToPool()
    // child.mutate(0.1)
    // // console.log("child genes: ", child.genes)
    // population.updateMatingPool(child)
    // population.removeNullParents()

    // return child.genes
// }
// for(let i = 0;i < 1000; i++){
//   evolution()
// }
// evolution()
// evolution()
// evolution()
// evolution()
// evolution()
// evolution()
