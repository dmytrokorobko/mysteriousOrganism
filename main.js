// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Task 3 - Factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    
    //Task 4
    mutate() {
      const baseNum = Math.floor(Math.random() * 15);
      const dnaBaseOrig = this.dna[baseNum];
      dnaBaseNew = dnaBaseOrig;
      do {
        dnaBaseNew = returnRandBase();  
      } while (dnaBaseOrig === dnaBaseNew);
      this.dna[baseNum] = dnaBaseNew;
    },

    //Task 5
    compareDNA(pAequor, isPrint) {
      let count = 0;
      for (let i = 0; i < 15; i++) 
        if (this.dna[i] === pAequor.dna[i]) count++;
      if (isPrint) console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${(count / 15 * 100).toFixed(0)}% DNA in common`);
      return count / 15 * 100; //for task 9-2
    },

    //Task 6
    willLikelySurvive() {
      let cCount = 0;
      let gCount = 0;
      this.dna.forEach(element => {
        if (element === 'C') cCount++;
        else if (element === 'G') gCount++;
      });
      return (cCount / 15 * 100).toFixed(0) >= 60 || (gCount / 15 * 100).toFixed(0) >= 60 ? true : false;
    },

    //task 9-1 - possible I misunderstood the requirements of how to do this task
    complementStrand() {
      const result = [];
      this.dna.forEach(base => {
        switch(base) {
          case 'A': 
            result.push('T');
            break;
          case 'T': 
            result.push('A');
            break;
          case 'C': 
            result.push('G');
            break;
          case 'G': 
            result.push('C');
            break;
        };
      });      
      return result;
    }
  }
}

//Task 7 - create array for N instances with 60% C or G
const generateArray = count => {
  const pAequorArray = [];
  for (let i = 0; i < count; i++) {
    const dna = pAequorFactory(i + 1, mockUpStrand());
    while (!dna.willLikelySurvive()) {
      dna.mutate();
    }
    pAequorArray.push(dna);
  }
  return pAequorArray
}

//Task 9-2 - Find the two most related instances
const maxDNAinCommon = pAequorArray => {
  let bb = 0;
  let bbI = 0;
  let bbJ = 0;
  for (let i = 0; i < pAequorArray.length - 1; i++) {
    for (let j = i + 1; j < pAequorArray.length; j++) {
      if (pAequorArray[i].compareDNA(pAequorArray[j], false) > bb) {
        bb = pAequorArray[i].compareDNA(pAequorArray[j], false);
        bbI = i; 
        bbJ = j;
      }
    }
  };

  console.log(pAequorArray[bbI].specimenNum + ': ' + pAequorArray[bbI].dna.join('') + ' and ' + pAequorArray[bbJ].specimenNum + ': ' + pAequorArray[bbJ].dna.join('') + ' have ' + bb.toFixed(0) + '% the most DNA in common');
};

//---------------------TESTS--------------------------
//test - task 4 - function mutate
console.log('Test mutate function');
const pAequor = pAequorFactory(1, mockUpStrand());
console.log(pAequor.specimenNum + ": " + pAequor.dna.join(''));
pAequor.mutate();
console.log(pAequor.specimenNum + ": " + pAequor.dna.join('') + ' after mutate');

//test - task 5 - compare dna
console.log('');
console.log('Test compare function');
const pAequor2 = pAequorFactory(2, mockUpStrand());
pAequor.compareDNA(pAequor2, true); //second boolean argument for task 9-2

//test - task 6 - will likely survive
console.log('');
console.log('Test for at least 60% of C or G bases');
console.log(pAequor.specimenNum + ": " + pAequor.dna.join('') + ' ' + pAequor.willLikelySurvive());

//test - result for task 7
console.log('');
console.log('Test for generating N instances with at least 60% of C or G bases each');
const pAequorArray = generateArray(30);
pAequorArray.forEach(dna => {
  console.log(dna.specimenNum + ': ' + dna.dna.join(''));
});

//test - task 9-1
console.log('');
console.log('Complementary DNA strand');
console.log(pAequorArray[pAequorArray.length - 1].specimenNum + ': ' + pAequorArray[pAequorArray.length - 1].dna.join(''));
console.log(pAequorArray[pAequorArray.length - 1].specimenNum + ': ' + pAequorArray[pAequorArray.length - 1].complementStrand().join(''));

//task 9-2
console.log('');
console.log('Find the two most related instances');
maxDNAinCommon(pAequorArray);



