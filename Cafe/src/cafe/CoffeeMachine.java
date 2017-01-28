package cafe;

import cafe.coffees.Coffee;
import cafe.tanks.Tank;

/**
 *
 * @author touhid
 */
public class CoffeeMachine {

    private Tank coffeePowderTank;
    private Tank espressoPowderTank;
    private Tank waterTank;
    private Tank milkTank;
    private Tank sugerTank;
    
    int[] flags = new int[20];

    public CoffeeMachine(Tank coffeePowderTank, Tank espressoPowderTank, Tank waterTank, Tank milkTank, Tank sugerTank) {
        this.coffeePowderTank = coffeePowderTank;
        this.espressoPowderTank = espressoPowderTank;
        this.waterTank = waterTank;
        this.milkTank = milkTank;
        this.sugerTank = sugerTank;
        flags[8] = 1;
    }

    private void brewCoffee(Coffee coffee) {
        coffeePowderTank.reduceQty(coffee.getCoffeePowder());
        espressoPowderTank.reduceQty(coffee.getEspressoPowder());
        waterTank.reduceQty(coffee.getWater());
        milkTank.reduceQty(coffee.getMilk());
        sugerTank.reduceQty(coffee.getSuger());
        
        System.out.println("Here is your coffee!");
        System.out.println("\tWater: " + coffee.getWater() + " ml");
        System.out.println("\tCoffee: " + coffee.getCoffeePowder()+ " gm");
        System.out.println("\tEspresso: " + coffee.getEspressoPowder()+ " gm");
        System.out.println("\tMilk: " + coffee.getMilk()+ " ml");
        System.out.println("\tSuger: " + coffee.getSuger()+ " gm");
        System.out.println();
        System.out.println("State of Coffe Machine:");
        System.out.println("\tWater: " + waterTank.getQty() + " ml");
        System.out.println("\tCoffee: " + coffeePowderTank.getQty() + " gm");
        System.out.println("\tEspresso: " + espressoPowderTank.getQty() + " gm");
        System.out.println("\tMilk: " + milkTank.getQty() + " ml");
        System.out.println("\tSuger: " + sugerTank.getQty() + " gm");
        System.out.println();
        flags[7] = 1;
    }

    private boolean isBrewable(Coffee coffee) {
        boolean brewable = true; 

        if (!coffeePowderTank.isReducable(coffee.getCoffeePowder())) {
            flags[0] = 1;
            brewable = false;
        }
        if (!espressoPowderTank.isReducable(coffee.getEspressoPowder())) {
            flags[1] = 1;
            brewable = false;
        }
        if (!waterTank.isReducable(coffee.getWater())) {
            System.out.println("Not enough " + waterTank.getElement());
            brewable = false;
            flags[2] = 1;
        }
        if (!milkTank.isReducable(coffee.getMilk())) {
            brewable = false;
            flags[3] = 1;
        }
        if (!sugerTank.isReducable(coffee.getSuger())) {
            brewable = false;
            flags[4] = 1;
        }
        return brewable;
    }
    
    public void brewingControl(Coffee coffee){
        if (! isBrewable(coffee)) {
            flags[5] = 1;
            System.out.println("WARNING! Coffee cannot be brewed!");
        } else {
            flags[6] = 1;
            brewCoffee(coffee);
        }
    }

    public int[] getFlags() {
        return flags;
    }
    
    
}
