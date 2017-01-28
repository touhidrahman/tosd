package cafe.tanks;

/**
 *
 * @author touhid
 */
public class Tank {
    private String element;
    private int qty;
    private int limit;
    
    private static int _xs = 0;
    
    public Tank(int limit){
        this.limit = limit;
        Tank._xs++;
    }
    
    public Tank(String elem, int limit){
        this.element = elem;
        this.limit = limit;
        Tank._xs++;
    }   

    public String getElement() {
        Tank._xs++;
        return element;
    }

    public void setElement(String element) {
        Tank._xs++;
        this.element = element;
    }

    public int getQty() {
        Tank._xs++;
        return qty;
    }

    public int getLimit() {
        Tank._xs++;
        return limit;
    }

    public void setLimit(int limit) {
        Tank._xs++;
        this.limit = limit;
    }
    
    // add more to the tank
    public void addQty(int qty){
        Tank._xs++;
        if (this.isFillable(qty)) {
            this.qty += qty;
        }
    }
    
    // reduce from the tank qty
    public void reduceQty(int qty) {
        
        if (this.isReducable(qty)) {
            this.qty -= qty;
            Tank._xs++;
        }
    }
    
    // get the left amount of qty which can be added into the tank
    public int getFillableCapacity (){
        Tank._xs++;
        return limit - qty;
    }
    
    public boolean isReducable(int qty){
        Tank._xs++;
        if ((this.qty - qty) < 0) {
            System.out.println(getElement() + " is insufficient. Consider reload.");
            return false;
        }
        return true;
    }
    
    public boolean isFillable(int qty){
        if ((this.qty + qty) <= limit) {
            return true;
        }
        System.out.println(getElement() + " is overloading! Cannot reload.");
        Tank._xs++;
        return false;
    }
}
