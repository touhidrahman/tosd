package cafe;

import cafe.coffees.Coffee;
import cafe.tanks.Tank;
import java.util.Scanner;
import java.util.stream.IntStream;

/**
 *
 * @author touhid
 */
public class Cafe {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        /**
         * Code Coverage Tests
         */
        
        // Tank definitions: ingredient, limit
        Tank waterTank = new Tank("Water", 4 * 1000); // limit 4 ltr
        Tank coffeeTank = new Tank("Coffee Powder", 1 * 1000); // limit 1 kg
        Tank espressoTank = new Tank("Espresso Powder", 500); // limit 500 gm
        Tank milkTank = new Tank("Milk", 1 * 1000); // limit 1 ltr
        Tank sugerTank = new Tank("Suger", 1 * 1000); // limit 1 kg

        // Coffee definitions: water, coffeePowder, espressoPowder, milk
        Coffee normal = new Coffee(250, 14, 0, 0);
        Coffee normalWithMilk = new Coffee(220, 14, 30, 0);
        Coffee cappucino = new Coffee(30, 7, 0, 50);
        Coffee milkCoffee = new Coffee(30, 14, 0, 60);

        int [] coffeeCCcounts = new int[4];
        coffeeCCcounts[0] = IntStream.of(normal.getXs()).sum();
        coffeeCCcounts[1] = IntStream.of(normalWithMilk.getXs()).sum();
        coffeeCCcounts[2] = IntStream.of(cappucino.getXs()).sum();
        coffeeCCcounts[3] = IntStream.of(milkCoffee.getXs()).sum();
        
        int sumCoffee = IntStream.of(coffeeCCcounts).sum();
                
        // Test Case 1

        System.out.println("Running Test 1");
        System.out.println("==============START=============");
        // Fill tanks
        waterTank.addQty(5000);
        coffeeTank.addQty(500);
        espressoTank.addQty(500);
        milkTank.addQty(500);
        sugerTank.addQty(2000);

        // create coffee machine
        CoffeeMachine cm = new CoffeeMachine(coffeeTank, espressoTank, waterTank, milkTank, sugerTank);

        // select a coffee type
        cm.brewingControl(normal);
        
        System.out.println("===============END==============");
        System.out.println("");
        
        int[] count = cm.getFlags();
        int sum = IntStream.of(count).sum();
        System.out.println("Total blocks of Coffee Class executed: " + sumCoffee);
        System.out.println("Total blocks of CoffeeMachine Class executed: " + sum);

    }

}
