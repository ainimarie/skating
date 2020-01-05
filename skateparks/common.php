<?php

/**
 * convert HTML-characters
 */

 function escape($html) {
     return htmlspecialchars($html, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
 }