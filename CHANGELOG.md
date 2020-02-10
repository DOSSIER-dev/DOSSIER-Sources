### 1.2.1 (2020-02-10)

##### Build System / Dependencies

*  upgrade nginx version for TLS1.3 (eda920ad)
*  upgrade mysqlclient version (3b0c7498)
*  django 2.2 (2048f991)
*  upgrade angular 7 -> 8 (836dc166)

##### Other Changes

*  deprecate older ssl standards in example nginx config (98341fab)
*  provide dummy/default values for database connection. (fd3b7229)
*  hide tag select list by adding press 'esc' key (c5e706b7)
*  improve inventory chart (7668b31b)
* **embedlib:**  unsubscribe all obsv. on component destroy (42f956bc)

##### Refactors

* **pdfdisplay:**
  *  rename private component method to distinguish from pdfjs method (6057cee8)
  *  adhere to new pdfjs api v2 (1269abda)
* **embed-overlay:**
  *  add class to overlay iframe (6580fac7)
  *  prefix style classes of embed/overlay (1cf6c08c)

