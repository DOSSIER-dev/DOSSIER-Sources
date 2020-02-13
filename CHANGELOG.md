#### 1.3.1 (2020-02-13)

Fixes double-parsing caused by loading the embed-lib twice (es2015/es5).

* **embedlib:**
  *  set a data-attribiute. prevents double parsing (75b6b3c4)
  *  loading script - account for angular 8 differential loading (69c7e7bc)
* **buildscript:**  improve lib-release script, takes parameters (70cabd89)
*  documentation added to lib-release.js helper script (a7d31e30)
*  remove duplicate cypress configuration. (18ee4a2f)

#### 1.3.0 (2020-02-11)

##### Bug Fixes

*  positioning of directly opened (via url) annotations (e373723f)
*  tolerate missing database (37bb62b6)
*  change edit route, allows correctly start/end edit of source metadata (539ac58c)

##### Other Changes

*  remove console.log output (8f720886)

##### Refactors

*  take care of unsubscription of observable (045db90a)

##### Code Style Changes

*  minor code style changes (7f11209d)

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

