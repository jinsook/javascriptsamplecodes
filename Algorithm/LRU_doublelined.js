function LRU() {

    var node = function(id){
        id=id,
        next= null,
        prev= null
    };

    this._length = 0;
    this._head = new node('head', '');
    this._tail = new node('tail', '')

    this.add = function (newitem){
        //create a new item object, place data in
        if(typeof newitem != "undefined"){
            var newitem = new node(newitem);
        }


        //special case: no items in the list yet
        if (this._length === 0) {
            node.next = this._tail;
            node.prev = this._head;
            this._head.next = node;
            this._tail.prev = node;
        } else {
            //attach to the tail node
            node.next = this._head.next;

            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }        

        //don't forget to update the count
        this._length++;

    };

    this.remove= function(index){

        //check for out-of-bounds values
        if (index > -1 && index < this._length){

            var current = this._head,
                i = 0;

            //special case: removing first item
            if (index === 0){
                this._head = current.next;

                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the
                 * new this._head to be null.
                 */
                if (!this._head){
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }

            //special case: removing last item
            } else if (index === this._length -1){
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {

                //find the right location
                while(i++ < index){
                    current = current.next;
                }

                //skip over the item to remove
                current.prev.next = current.next;
            }

            //decrement the length
            this._length--;

            //return the value
            return current.data;            

        } else {
            return null;
        }

    };

    //more methods here
}

var mydlink = new DoubleLinkedList();

console.log(mydlink._length);
mydlink.add('first');
mydlink.add('second');
mydlink.add('third');
console.log(mydlink._head);
console.log(mydlink._tail);
console.log(mydlink._length);
mydlink.remove(1);
console.log(mydlink._length);
console.log(mydlink._head.next);
