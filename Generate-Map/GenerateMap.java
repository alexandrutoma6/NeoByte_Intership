import java.util.HashSet;
import java.util.Random;
public class Main {
    static Random random = new Random();
    public static void main(String[] args) {
        islandGenerator();
    }

    public static void islandGenerator(){

        int matrixLength = 5;
        int[] zero_Coordonates;
        int[] five_Coordonates;
        //set up the starting points of '0' and '5' to be min 5 positions
        do {
            zero_Coordonates = randomMatrixIndex(matrixLength);
            five_Coordonates = randomMatrixIndex(matrixLength);
        } while (calculateManhattanDistance(zero_Coordonates[0], zero_Coordonates[1], five_Coordonates[0], five_Coordonates[1]) < 5);
        System.out.println("distanta  = " + calculateManhattanDistance(zero_Coordonates[0], zero_Coordonates[1], five_Coordonates[0], five_Coordonates[1]));
        int[][] island = place0and5(matrixLength,zero_Coordonates,five_Coordonates);
        //place the first element in matrix if it doesn't exist
        if(island[0][0] == -1){
            placeFirstDigit(island,zero_Coordonates,five_Coordonates);
        }
        island = fillIsland(island,zero_Coordonates,five_Coordonates);
        viewMatrix(island);
    }

    //complete the rest of the island
    private static int[][] fillIsland(int[][] island, int[] zero_Coordonates, int[] five_Coordonates) {
        //int[][] returnIsland = new int[island.length][island.length];
        viewMatrix(island);
        for (int i = 0; i < island.length; i++) {
            for (int j = 0; j < island.length; j++) {
                if(island[i][j] != -1) continue;
                //case if we are on the first row
                if(i == 0){
                    int[] limit = possibleNumbers(i,j,zero_Coordonates,five_Coordonates);
                    System.out.println("limit = "+limit[0] + " , " + limit[1]);
                    //add all the numbers possible from the reference (0 or 5)
                    int[] referencePossibilities = allNumbers(limit[1],limit[0]);
                    System.out.print("REFEREpossibilities array =   ");
                    viewArray(referencePossibilities);
                    //add the number possible from the left digit
                    int[] leftPossibilities = allNumbers(island[i][j-1] -1, island[i][j-1]+1);
                    System.out.print("LEFTpossibilities array =   ");
                    viewArray(leftPossibilities);
                    //intersect all the possibilities
                    int[] possibilities = intersect(referencePossibilities,leftPossibilities);
                    System.out.print("possibilities array =   ");
                    viewArray(possibilities);
                    //get a random index to get the correct number for the island
                    int randomIndex = random.nextInt(possibilities.length);
                    int number = possibilities[randomIndex];
                    island[i][j] = number;
                    continue;
                }

                if(j == 0){
                    int[] limit = possibleNumbers(i,j,zero_Coordonates,five_Coordonates);
                    System.out.println("limit = "+limit[0] + " , " + limit[1]);
                    //add all the numbers possible from the reference (0 or 5)
                    int[] referencePossibilities = allNumbers(limit[1],limit[0]);
                    System.out.print("REFEREpossibilities array =   ");
                    viewArray(referencePossibilities);
                    //add the number possible from the left digit
                    int[] upPossibilities = allNumbers(island[i-1][j] -1, island[i-1][j]+1);
                    System.out.print("UPpossibilities array =   ");
                    viewArray(upPossibilities);
                    //intersect all the possibilities
                    int[] possibilities = intersect(referencePossibilities,upPossibilities);
                    System.out.print("possibilities array =   ");
                    viewArray(possibilities);
                    //get a random index to get the correct number for the island
                    int randomIndex = random.nextInt(possibilities.length);
                    int number = possibilities[randomIndex];
                    island[i][j] = number;
                    continue;
                }
                int[] limit = possibleNumbers(i,j,zero_Coordonates,five_Coordonates);
                System.out.println("limit = "+limit[0] + " , " + limit[1]);
                //add all the numbers possible from the reference (0 or 5)
                int[] referencePossibilities = allNumbers(limit[1],limit[0]);
                System.out.print("REFEREpossibilities array =   ");
                viewArray(referencePossibilities);
                //add the number possible from the left digit
                int[] leftPossibilities = allNumbers(island[i][j-1] -1, island[i][j-1]+1);
                System.out.print("LEFTpossibilities array =   ");
                viewArray(leftPossibilities);
                //add the number possible from the up digit
                int[] upPossibilities = allNumbers(island[i-1][j] -1, island[i-1][j]+1);
                System.out.print("UPpossibilities array =   ");
                viewArray(upPossibilities);
                //intersect all the possibilities
                int[] possibilities = intersect(referencePossibilities,leftPossibilities);
                possibilities = intersect(upPossibilities,possibilities);
                System.out.print("possibilities array =   ");
                viewArray(possibilities);
                //get a random index to get the correct number for the island
                int randomIndex = random.nextInt(possibilities.length);
                int number = possibilities[randomIndex];
                island[i][j] = number;
                System.out.println("1.-----------");
                viewMatrix(island);
                System.out.println("-----------");
            }


        }
        return  island;
    }

    //display in console the array
    public static void viewArray(int[] array){
        for (int x:array
             ) {
            System.out.print(x + " ");
        }
        System.out.println();
    }

    //place the first digit in relation with the 0 and 5
    public static int[][] placeFirstDigit(int[][] matrix, int[] zero_Coordonates, int[] five_Coordonates){
        System.out.println("PLACE FIRST NUMBER");
        int[] limit = possibleNumbers(0,0,zero_Coordonates,five_Coordonates);
        System.out.println("limit = "+limit[0] + " , " + limit[1]);

        int number = randomGenerateNumber(Math.abs(limit[1]-limit[0]), limit[1]);
        matrix[0][0] = number;
        return matrix;
    }

    //return an 2 element array that contains the smallest distance between the current point and 0 or five, and the 0 or five which is closer
    // ex: if 0 is 2 distance away ==>> [2,0]
    public static int[] possibleNumbers(int currentI, int currentJ, int[] zero_Coordonates, int[] five_Coordonates){
        int distanceToZero = calculateManhattanDistance(currentI,currentJ, zero_Coordonates[0],zero_Coordonates[1]);
        int distanceToFive = calculateManhattanDistance(currentI,currentJ, five_Coordonates[0],five_Coordonates[1]);
        if(distanceToZero <= distanceToFive){
          return new int[]{distanceToZero, 0};
        }
        return new int[]{distanceToFive, 5};
    }

    //place 0 and 5 at minimum 5 distance
    public static int[][] place0and5(int matrixLength, int[] zero_Coordonates, int[] five_Coordonates){
        int iZERO = zero_Coordonates[0]; int jZERO = zero_Coordonates[1];
        int iFIVE = five_Coordonates[0]; int jFIVE = five_Coordonates[1];
        System.out.print("i0 = "+ iZERO);
        System.out.println("  j0 = "+ jZERO);
        System.out.print("i5 = "+ iFIVE);
        System.out.println("  j5 = "+ jFIVE);
        System.out.println();
        //int[][] island = new int[matrixLength][matrixLength];
        int[][] island = createMatrix(matrixLength);
        island[iZERO][jZERO] = 0;
        island[iFIVE][jFIVE] = 5;
        return island;
    }

    //Generate a random number in the range of min and max-1 => math.abs(max + 1 - min) makes it to generate from min and max
    public static int randomGenerateNumber(int min, int max){
        if(min > max){
            int obs = min;
            min = max;
            max = obs;
        }
        return random.nextInt(Math.abs(max + 1 - min)) + min;
    }

    //Generate a random element in the matrix
    public static int[] randomMatrixIndex(int matrixLength){
        int randomI = random.nextInt(matrixLength);
        int randomJ = random.nextInt(matrixLength);
        return new int[]{randomI,randomJ};
    }

    //Manhattan distance is a distance measure that is calculated by taking the sum of distances between the x and y coordinates.
    public static int calculateManhattanDistance(int x1,int y1, int x2, int y2){
        return Math.abs(x2-x1)+Math.abs(y2-y1);
    }
    public static void viewMatrix(int[][] matrix){
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }

    //create the matrix filled with -1
    public static int[][] createMatrix(int matrixLength){
        int[][] returnMatrix = new int[matrixLength][matrixLength];
        for (int i = 0; i < matrixLength; i++) {
            for (int j = 0; j < matrixLength; j++) {
                returnMatrix[i][j] = -1;
            }
        }
        return returnMatrix;
    }

    //write all the numbers between the limit in an array
    public static int[] allNumbers(int min, int max){
        int j = 0;
        //min = Math.abs(max-min);
        if(min > max){
            int obs = min;
            min = max;
            max = obs;
        }
        int[] returnItems = new int[Math.abs(max-min+1)];
        for (int i = min; i <= max; i++) {
            returnItems[j] = i;
            j++;
        }
        return returnItems;
    }
    //intersect 2 arrays and return the result in an array
    public static int[] intersect(int[] nums1, int[] nums2) {
        // Create two hash sets to store unique elements of each array
        HashSet<Integer> set1 = new HashSet<>();
        HashSet<Integer> set2 = new HashSet<>();

        // Add elements from the first array to set1
        for (int num : nums1) {
            set1.add(num);
        }

        // Add elements from the second array to set2
        for (int num : nums2) {
            set2.add(num);
        }

        // Find the common elements by performing an intersection of the two sets
        set1.retainAll(set2);

        // Convert the result set back to an array
        int[] result = new int[set1.size()];
        int index = 0;
        for (int num : set1) {
            result[index++] = num;
        }

        return result;
    }
}