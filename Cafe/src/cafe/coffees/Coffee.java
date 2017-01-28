package cafe.coffees;

/**
 *
 * @author touhid
 */
public class Coffee {
    private int water;
    private int coffeePowder;
    private int espressoPowder;
    private int milk;
    private int suger;
    
    private int[] _xs = new int[20];

    public Coffee(int water, int coffeePowder, int espressoPowder, int milk) {
        this.water = water;
        this.coffeePowder = coffeePowder;
        this.espressoPowder = espressoPowder;
        this.milk = milk;
        _xs[0] = 1;
    }    

    public Coffee() {
        _xs[1] = 1;
    }
    
    
    public int getWater() {
        _xs[2] = 1;
        return water;
    }

    public void setWater(int water) {
        _xs[3] = 1;
        this.water = water;
    }

    public int getCoffeePowder() {
        _xs[4] = 1;
        return coffeePowder;
    }

    public void setCoffeePowder(int coffeePowder) {
        _xs[5] = 1;
        this.coffeePowder = coffeePowder;
    }

    public int getEspressoPowder() {
        _xs[6] = 1;
        return espressoPowder;
    }

    public void setEspressoPowder(int espressoPowder) {
        _xs[7] = 1;
        this.espressoPowder = espressoPowder;
        
    }

    public int getMilk() {
        _xs[8] = 1;
        return milk;
    }

    public void setMilk(int milk) {
        _xs[9] = 1;
        this.milk = milk;
    }

    public int getSuger() {
        _xs[10] = 1;
        return suger;
    }

    public void setSuger(int suger) {
        _xs[11] = 1;
        this.suger = suger;
    }

    public int[] getXs() {
        return _xs;
    }
    
    
    
    
}
