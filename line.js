/*
*-------------------------------------------------------------------------
*   Hopefully this program satisfies what you were asking for.
*   It can take simple linear equations in the form of 'y = mx + b'.
*   As these lines weren't going to be on a graph, I didn't pay attention
*   to graphing their 'y-intercept' or 'b'.
*
*   To use the object, just use the 'init()' function in a browser.
*
*   I hope you like it!
*
*   Best,
*   Ryan Lott
*--------------------------------------------------------------------------
*/
const solveLinEq = {
  // Declaring x, y, and slope (m) variables
  y: 0, x: 0, m: "",
  // Declaring slope indices within string of
  mStart: 0, mEnd: 0,

  init(){
    // This function allows you to take advantage of the previous functions
    let input = window.prompt("Hello!\nPlease input a simple function in 'y=mx+b' format: ")
    input = this.removeSpaces(input)
    const slope = this.getSlope(input)
    console.log(`\nThe slope of that equation is ${slope[0]}/${slope[1]}\n`)
    this.drawLine(slope)
    console.log("Pretty cool line there!")
  },

   // Remove any potential whitespace characters
  removeSpaces(equation){
    return equation = equation.replace(/\s/g,'')
   },

   // For loop to iterate through equation string to procure slope indices
   getSlope(equation){

     // Gets start and stop of slope
    for(let index = 0; index < equation.length; ++index){
      if(equation[index] == "="){
        mStart = index + 1
        // If slope isn't present, assume slope is 1
         if(equation[mStart] == "x"){
           x = 1, y = 1
           return[y,x]
         }
       }else if(equation[index] == "x"){
         mEnd = index - 1
       }
     }
     // If start and stop the same, we have the slope
     if(mStart == mEnd){
         x = 1
         y = Number(equation[mStart])
         // Deals with cases where '-' is used without 1 before x
         if(isNaN(y)){
           y = -1
         }
         return [y, x]
         // Else need to find out if there's a fraction or
         // larger than single char int
     }else{
       // Takes substring that includes slope
       m = equation.slice(mStart, mEnd + 1)
       let xStart = 0, yEnd = 0
       const xEnd = mEnd-2, yStart = mStart-2
       // Check for fraction
       if(m.includes("/")){
         // If contains fraction
         yEnd = m.indexOf("/") - 1
         xStart = m.indexOf("/") + 1

         // If x and y are both single digits, can return slope
         if(yEnd == yStart && xEnd == xStart){
           x = Number(m[xStart]), y = Number(m[yStart])
           return [y,x]
         }else{
           y = Number(m.slice(yStart, yEnd+1))
           x = Number(m.slice(xStart))
           return [y,x]
         }
         // Else, it's the case that slope is longer than one char
       }else{
           y = Number(m)
           x = 1
           return [y, x]
       }
     }
   },

   drawLine(slope){
     let newLine = ""

     // Check signs to know where line should start
     if((slope[0] > 0 && slope[1] > 0) || (slope[0] < 0 && slope[1] < 0)){
       let spaces = "                                                  "
       // If slope is positive is both y and x are both negative
       slope[0] = Math.abs(slope[0]), slope[1] = Math.abs(slope[1])
       // Calculates number of '\n' based on y
       while(slope[0] > newLine.length + 1){
         newLine += "\n"
       }
       // Prints 10 stars (or less), removes spaces based on x value
       for(let z = 10; z > 0; --z){
           console.log(`${spaces}*${newLine}`)
           spaces = spaces.slice(0, -slope[1])
           // Breaks if runs out of space
           if(spaces.length == 0){
             break
           }
        }
      }else{
        let spaces = ""
        let spacesToAdd = ""
        // If slope is negative is either y or x are negative
        slope[0] = Math.abs(slope[0]), slope[1] = Math.abs(slope[1])
        // Calculates number of '\n' based on y
        while(slope[0] > newLine.length + 1){
          newLine += "\n"
        }
        // Calculates number of ' ' based on x
        while(slope[1] > spacesToAdd.length){
          spacesToAdd += " "
        }
        // Prints 10 stars (or less), removes spaces based on x value
        for(let z = 10; z > 0; --z){
            console.log(`${spaces}*${newLine}`)
            spaces += spacesToAdd
            // Breaks if runs out of space
            if(spaces.length  >= 50){
              break
            }
         }
      }
    }
  }
